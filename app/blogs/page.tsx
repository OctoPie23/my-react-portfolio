import { Blogs } from '@/components/blogs'
import { AlertIcon } from '@/components/icons'
import { PaginationControls } from '@/components/pagination-controls'
import { Search } from '@/components/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getBlogPostsLength, getBlogPostsWithContent } from '@/lib/blogs'
import { BLOGS_PER_PAGE_DEFAULT, PAGE_INDEX_DEFAULT } from '@/lib/constants'

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const pageQuery =
    typeof searchParams?.page === 'string'
      ? Number(searchParams?.page)
      : PAGE_INDEX_DEFAULT

  const perPageQuery =
    typeof searchParams?.perPage === 'string'
      ? Number(searchParams?.perPage)
      : BLOGS_PER_PAGE_DEFAULT

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q.trim() : undefined

  const blogsWithContent = searchQuery
    ? getBlogPostsWithContent({ all: true })
    : getBlogPostsWithContent({ page: pageQuery, perPage: perPageQuery })

  const filteredBlogsWithContent = searchQuery
    ? blogsWithContent.filter(blogWithContent =>
        blogWithContent.metadata.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : blogsWithContent

  const filteredBlogsWithContentLength = filteredBlogsWithContent.length

  const blogslength = searchQuery
    ? filteredBlogsWithContentLength
    : getBlogPostsLength()

  const totalPages = Math.ceil(blogslength / perPageQuery)

  const paginatedFilteredBlogsWithContent = filteredBlogsWithContent.slice(
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
        placeholder='Search blogs...'
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
        blogsWithContent={
          searchQuery ? paginatedFilteredBlogsWithContent : blogsWithContent
        }
      />
    </section>
  )
}
