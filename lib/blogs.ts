import request, { gql } from 'graphql-request'
import { env } from './env'
import {
  TGetBlogsMetadataArgs,
  TGetBlogsLength,
  TSubscribeToNewsletterResponse,
  TGetBlogPostIDBySlugResponse,
  TGetBlogsMetadata,
  TGetBlogByIDResponse,
} from '@/types/blogs'
import {
  BLOGS_PER_PAGE_DEFAULT,
  HASHNODE_POSTS_FETCH_LIMIT,
  HASHNODE_USERNAME,
  PAGE_INDEX_DEFAULT,
} from '@/lib/constants'

const endpoint = env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT
const publicationId = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID
const publicationHost = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST

export async function getBlogPostsLength(): Promise<number> {
  const query = gql`
    query getBlogPostsLength($publicationHost: String!) {
      publication(host: $publicationHost) {
        posts(first: 0) {
          totalDocuments
        }
      }
    }
  `

  const response = await request<TGetBlogsLength>(endpoint, query, {
    publicationHost,
  })

  return response.publication.posts.totalDocuments ?? 0
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
}): Promise<string> {
  const query = gql`
    query getPostBySlug($publicationHost: String!, $slug: String!) {
      publication(host: $publicationHost) {
        post(slug: $slug) {
          id
        }
      }
    }
  `
  const response = await request<TGetBlogPostIDBySlugResponse>(
    endpoint,
    query,
    {
      publicationHost,
      slug,
    },
  )

  return response.publication.post.id
}

export async function getBlogPostsCardMeta({
  pageSize = BLOGS_PER_PAGE_DEFAULT,
  page = PAGE_INDEX_DEFAULT,
  all = false,
}: TGetBlogsMetadataArgs) {
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
            hasPreviousPage
            previousPage
            nextPage
          }
        }
      }
    }
  `

  if (all) {
    const allPosts = []
    let currentPage = page
    let hasNextPage = true

    while (hasNextPage) {
      // Fetch all posts in the chunk of 10. NOTE: The upper limit from hashnode is 20
      // Don't pass the pageSizeQuery in the pageSize field to this function. If the user
      // requests for more than 20 posts, the API will throw an error
      const response = await request<TGetBlogsMetadata>(endpoint, query, {
        username: HASHNODE_USERNAME,
        pageSize:
          pageSize < HASHNODE_POSTS_FETCH_LIMIT
            ? pageSize
            : HASHNODE_POSTS_FETCH_LIMIT,
        page: currentPage,
      })

      const posts = response.user.posts.edges.map(edge => edge.node)
      allPosts.push(...posts)

      hasNextPage = response.user.posts.pageInfo.hasNextPage
      currentPage = response.user.posts.pageInfo.nextPage ?? currentPage + 1
    }

    return {
      posts: allPosts.filter(post => post.publication.id === publicationId),
      pageInfo: null,
    }
  }

  const response = await request<TGetBlogsMetadata>(endpoint, query, {
    username: HASHNODE_USERNAME,
    pageSize:
      pageSize < HASHNODE_POSTS_FETCH_LIMIT
        ? pageSize
        : HASHNODE_POSTS_FETCH_LIMIT,
    page,
  })

  const posts = response.user.posts.edges.map(edge => edge.node)

  return {
    posts: posts.filter(post => post.publication.id === publicationId),
    pageInfo: response.user.posts.pageInfo,
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
