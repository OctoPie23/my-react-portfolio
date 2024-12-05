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
import { FilterDropdown } from '@/components/filter-dropdown'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Collection of my blogs fetched through Hashnode Headless CMS',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const pageQueryRaw = searchParams?.page
  const perPageQueryRaw = searchParams?.perPage

  const pageQuery =
    typeof pageQueryRaw === 'string' && !isNaN(Number(pageQueryRaw))
      ? Math.max(Number(pageQueryRaw), 1)
      : PAGE_INDEX_DEFAULT

  const perPageQuery =
    typeof perPageQueryRaw === 'string' && !isNaN(Number(perPageQueryRaw))
      ? Math.max(Number(perPageQueryRaw), 1)
      : BLOGS_PER_PAGE_DEFAULT

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q.trim() : undefined

  const { blogs } = searchQuery
    ? await getBlogPostsCardMeta({ all: true })
    : await getBlogPostsCardMeta({ page: pageQuery, pageSize: perPageQuery })

  const filteredBlogs = searchQuery
    ? {
        blogs: blogs.filter(
          blog =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags?.some(tag =>
              tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        ),
      }
    : { blogs }

  const filteredBlogsLength = filteredBlogs.blogs.length

  const blogslength = searchQuery
    ? filteredBlogsLength
    : await getBlogPostsLength()

  const totalPages = Math.max(Math.ceil(blogslength / perPageQuery), 0)

  if (totalPages > 0 && pageQuery > totalPages) {
    const params = new URLSearchParams(searchParams as Record<string, string>)

    params.set('page', String(totalPages))
    redirect(`/blogs?${params.toString()}`)
  }

  const paginatedFilteredBlogs = filteredBlogs.blogs.slice(
    (pageQuery - 1) * perPageQuery,
    pageQuery * perPageQuery,
  )

  const noOfBlogsShownAlready =
    filteredBlogsLength === 0
      ? 0
      : searchQuery
        ? paginatedFilteredBlogs.length + (pageQuery - 1) * perPageQuery
        : filteredBlogsLength + (pageQuery - 1) * perPageQuery

  return (
    <section>
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
            className='font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground'
          >
            DEV
          </a>{' '}
          and{' '}
          <a
            href='https://shricodev.hashnode.dev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground'
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

      <FilterDropdown
        endpoint='blogs'
        defaultPerPage={BLOGS_PER_PAGE_DEFAULT}
      />

      <PaginationControls
        searchTerm={searchQuery}
        currentPage={pageQuery}
        totalPages={totalPages}
        perPage={perPageQuery}
        endpoint='blogs'
      />

      <div className='mb-10 mt-5 flex justify-between text-sm font-medium text-muted-foreground'>
        <p>
          Showing {noOfBlogsShownAlready} of{' '}
          {searchQuery ? filteredBlogsLength : blogslength} blogs
        </p>
        <p>
          Page {totalPages === 0 ? 0 : pageQuery} of {totalPages}
        </p>
      </div>

      <Blogs blogsWithMeta={searchQuery ? paginatedFilteredBlogs : blogs} />
    </section>
  )
}
