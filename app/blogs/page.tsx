import { Blogs } from '@/components/blogs'
import { AlertIcon } from '@/components/icons'
import { PaginationControls } from '@/components/pagination-controls'
import { Search } from '@/components/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  BLOGS_PER_PAGE_DEFAULT,
  DEBOUNCE_TIME_BLOGS,
  PAGE_INDEX_DEFAULT,
} from '@/lib/constants'
import { getBlogPostsCardMeta } from '@/lib/blogs'
import type { Metadata } from 'next'
import { getBlogPostsLength } from '@/lib/blogs'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Collection of my blogs fetched through Hashnode Headless CMS',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const pageQuery =
    typeof searchParams?.page === 'string'
      ? Math.max(Number(searchParams?.page), 1)
      : PAGE_INDEX_DEFAULT

  const perPageQuery =
    typeof searchParams?.perPage === 'string'
      ? Math.max(Number(searchParams?.perPage), 1)
      : BLOGS_PER_PAGE_DEFAULT

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q.trim() : undefined

  const blogsWithMeta = searchQuery
    ? await getBlogPostsCardMeta({ all: true })
    : await getBlogPostsCardMeta({ page: pageQuery, pageSize: perPageQuery })

  const filteredBlogsWithPageInfo = searchQuery
    ? {
        posts: blogsWithMeta.posts.filter(
          blog =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags?.some(tag =>
              tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        ),
        pageInfo: blogsWithMeta.pageInfo,
      }
    : blogsWithMeta

  const filteredBlogsWithContentLength = filteredBlogsWithPageInfo.posts.length

  const blogslength = searchQuery
    ? filteredBlogsWithContentLength
    : await getBlogPostsLength()

  const totalPages = Math.ceil(blogslength / perPageQuery)

  const paginatedFilteredBlogsWithContent =
    filteredBlogsWithPageInfo.posts.slice(
      (pageQuery - 1) * perPageQuery,
      pageQuery * perPageQuery,
    )

  const noOfBlogsShownAlready = searchQuery
    ? paginatedFilteredBlogsWithContent.length + (pageQuery - 1) * perPageQuery
    : filteredBlogsWithContentLength + (pageQuery - 1) * perPageQuery

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Blogs</h1>
      <Alert className='mb-4'>
        <AlertIcon className='size-5' />
        <AlertTitle className='text-sm font-semibold uppercase'>
          Heads up!
        </AlertTitle>
        <AlertDescription className='text-sm text-muted-foreground'>
          Check out these posts on{' '}
          <a
            href='https://dev.to/shricodev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
          >
            DEV
          </a>{' '}
          and{' '}
          <a
            href='https://shricodev.hashnode.dev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
          >
            Hashnode
          </a>{' '}
          for full engagement.
        </AlertDescription>
      </Alert>

      <Search
        query={searchQuery}
        endpoint='blogs'
        debounceTime={DEBOUNCE_TIME_BLOGS}
        placeholder='Search blogs by title or tags...'
      />

      <PaginationControls
        searchTerm={searchQuery}
        currentPage={pageQuery}
        totalPages={totalPages}
        perPage={perPageQuery}
        endpoint='blogs'
      />

      <div className='mb-10 mt-5 flex justify-between'>
        <p className='text-sm font-medium text-muted-foreground'>
          Showing {noOfBlogsShownAlready} of{' '}
          {searchQuery ? filteredBlogsWithContentLength : blogslength} blogs
        </p>
        <p className='text-sm font-medium text-muted-foreground'>
          page {pageQuery} of {totalPages}
        </p>
      </div>

      <Blogs
        blogsWithMeta={
          searchQuery ? paginatedFilteredBlogsWithContent : blogsWithMeta.posts
        }
      />
    </section>
  )
}
