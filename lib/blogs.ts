import request, { gql } from 'graphql-request'
import { env } from '@/lib/env'
import {
  TGetBlogsMetadataArgs,
  TGetBlogsLength,
  TSubscribeToNewsletterResponse,
  TGetBlogsMetadata,
  TGetBlogByIDResponse,
  TGetBlogPostIDBySlugResponse,
  TBlogCardMetadata,
  TGetBlogsSlugs,
} from '@/types/blogs'
import {
  BLOGS_PER_PAGE_DEFAULT,
  HASHNODE_BLOGS_FETCH_LIMIT,
  HASHNODE_USERNAME,
  PAGE_INDEX_DEFAULT,
} from '@/lib/constants'

const endpoint = env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT
const publicationId = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID
const publicationHost = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST

export async function getBlogPostsLength(): Promise<number> {
  const query = gql`
    query getBlogPostsLength($username: String!) {
      user(username: $username) {
        posts(page: 1, pageSize: 1) {
          totalDocuments
        }
      }
    }
  `

  const response = await request<TGetBlogsLength>(endpoint, query, {
    username: HASHNODE_USERNAME,
  })

  return response.user.posts.totalDocuments ?? 0
}

export async function getBlogPostByID({
  id,
}: {
  id: string
}): Promise<TGetBlogByIDResponse> {
  const query = gql`
    query getPostByID($id: ID!) {
      post(id: $id) {
        title
        subtitle
        readTimeInMinutes
        brief
        publishedAt
        seo {
          description
        }
        tags {
          name
        }
        coverImage {
          url
        }
        content {
          markdown
        }
        author {
          name
        }
      }
    }
  `

  const response = await request<TGetBlogByIDResponse>(endpoint, query, {
    id,
  })
  return response
}

export async function getBlogPostIDBySlug({
  slug,
}: {
  slug: string
}): Promise<TGetBlogPostIDBySlugResponse | null> {
  const query = gql`
    query getPostBySlug($publicationHost: String!, $slug: String!) {
      publication(host: $publicationHost) {
        post(slug: $slug) {
          id
        }
      }
    }
  `

  const publicationHosts = [
    publicationHost,
    ...(env.NEXT_PUBLIC_HASHNODE_ADDITIONAL_PUBLICATION_HOSTS.split(',') || []),
  ].filter(host => host && host.trim() !== '')

  for (const publicationHost of publicationHosts) {
    try {
      const response = await request<TGetBlogPostIDBySlugResponse>(
        endpoint,
        query,
        {
          publicationHost,
          slug,
        },
      )
      if (response.publication?.post.id) return response
    } catch (error) {
      console.error(
        `Error querying publication host for post Id: ${publicationHost}`,
        error,
      )
    }
  }

  return null
}

export async function getAllBlogPostsSlug({
  pageSize = BLOGS_PER_PAGE_DEFAULT,
  page = PAGE_INDEX_DEFAULT,
}: TGetBlogsMetadataArgs): Promise<{ slugs: { slug: string }[] }> {
  const query = gql`
    query getPosts($username: String!, $pageSize: Int!, $page: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              slug
            }
          }
          pageInfo {
            hasNextPage
            nextPage
          }
        }
      }
    }
  `

  const slugs = []
  let currentPage = page
  let hasNextPage = true

  while (hasNextPage) {
    // Fetch all posts in the chunk of 10. NOTE: The upper limit from hashnode is 20
    // Don't pass the pageSizeQuery in the pageSize field to this function. If the user
    // requests for more than 20 posts, the API will throw an error
    const response = await request<TGetBlogsSlugs>(endpoint, query, {
      username: HASHNODE_USERNAME,
      pageSize:
        pageSize < HASHNODE_BLOGS_FETCH_LIMIT
          ? pageSize
          : HASHNODE_BLOGS_FETCH_LIMIT,
      page: currentPage,
    })

    const blogs = response.user.posts.edges.map(edge => edge.node)
    slugs.push(...blogs)

    hasNextPage = response.user.posts.pageInfo.hasNextPage
    currentPage = response.user.posts.pageInfo.nextPage ?? currentPage + 1
  }

  return {
    slugs,
  }
}

export async function getBlogPostsCardMeta({
  pageSize = BLOGS_PER_PAGE_DEFAULT,
  page = PAGE_INDEX_DEFAULT,
  all = false,
}: TGetBlogsMetadataArgs): Promise<{ blogs: TBlogCardMetadata[] }> {
  const query = gql`
    query getPosts($username: String!, $pageSize: Int!, $page: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              id
              title
              readTimeInMinutes
              publishedAt
              updatedAt
              publication {
                id
              }
              brief
              slug
              tags {
                name
              }
              author {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            nextPage
          }
        }
      }
    }
  `

  if (all) {
    const allBlogs = []
    let currentPage = page
    let hasNextPage = true

    while (hasNextPage) {
      // Fetch all posts in the chunk of 10. NOTE: The upper limit from hashnode is 20
      // Don't pass the pageSizeQuery in the pageSize field to this function. If the user
      // requests for more than 20 posts, the API will throw an error
      const response = await request<TGetBlogsMetadata>(endpoint, query, {
        username: HASHNODE_USERNAME,
        pageSize:
          pageSize < HASHNODE_BLOGS_FETCH_LIMIT
            ? pageSize
            : HASHNODE_BLOGS_FETCH_LIMIT,
        page: currentPage,
      })

      const blogs = response.user.posts.edges.map(edge => edge.node)
      allBlogs.push(...blogs)

      hasNextPage = response.user.posts.pageInfo.hasNextPage
      currentPage = response.user.posts.pageInfo.nextPage ?? currentPage + 1
    }

    return {
      blogs: allBlogs,
    }
  }

  const response = await request<TGetBlogsMetadata>(endpoint, query, {
    username: HASHNODE_USERNAME,
    pageSize:
      pageSize < HASHNODE_BLOGS_FETCH_LIMIT
        ? pageSize
        : HASHNODE_BLOGS_FETCH_LIMIT,
    page,
  })

  const blogs = response.user.posts.edges.map(edge => edge.node)

  return {
    blogs,
  }
}

export async function subscribeToNewsletter({
  email,
}: {
  email: string
}): Promise<TSubscribeToNewsletterResponse> {
  const mutation = gql`
    mutation subscribeToNewsletter($publicationId: ObjectId!, $email: String!) {
      subscribeToNewsletter(
        input: { email: $email, publicationId: $publicationId }
      ) {
        status
      }
    }
  `

  const response = await request<TSubscribeToNewsletterResponse>(
    endpoint,
    mutation,
    {
      publicationId,
      email,
    },
  )

  return response
}
