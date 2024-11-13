import { AlertIcon } from '@/components/icons'
import { PaginationControls } from '@/components/pagination-controls'
import { Projects } from '@/components/projects'
import { Search } from '@/components/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PAGE_INDEX_DEFAULT, PROJECTS_PER_PAGE_DEFAULT } from '@/lib/constants'
import { getProjectsLength, getProjectsMetadata } from '@/lib/projects'

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
      : PROJECTS_PER_PAGE_DEFAULT

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q.trim() : undefined

  const projectsMeta = searchQuery
    ? getProjectsMetadata({ all: true })
    : getProjectsMetadata({ page: pageQuery, perPage: perPageQuery })

  const filteredProjectsMeta = searchQuery
    ? projectsMeta.filter(
        projectMeta =>
          projectMeta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          projectMeta.language
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : projectsMeta

  const filteredProjectsLength = filteredProjectsMeta.length

  // Update this line to use filteredProjectsLength for total pages when searching
  const projectsLength = searchQuery
    ? filteredProjectsLength
    : getProjectsLength()

  // Calculate total pages based on whether there is a search query or not
  const totalPages = Math.ceil(projectsLength / perPageQuery)

  // Paginate the filtered results
  const paginatedFilteredProjectsMeta = filteredProjectsMeta.slice(
    (pageQuery - 1) * perPageQuery,
    pageQuery * perPageQuery,
  )

  // Update the count displayed to the user
  const noOfPostsShownAlready = searchQuery
    ? paginatedFilteredProjectsMeta.length + (pageQuery - 1) * perPageQuery
    : filteredProjectsLength + (pageQuery - 1) * perPageQuery

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Projects</h1>
      <Alert className='mb-4'>
        <AlertIcon className='size-5' />
        <AlertTitle className='text-sm font-semibold uppercase'>
          Heads up!
        </AlertTitle>
        <AlertDescription className='text-sm text-muted-foreground'>
          It does not lists all of my projects. To view them all, check out my{' '}
          <a
            href='https://github.com/shricodev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
          >
            GitHub
          </a>{' '}
          profile.
        </AlertDescription>
      </Alert>

      <Search
        query={searchQuery}
        endpoint='projects'
        placeholder='Search projects by name or language...'
      />

      <PaginationControls
        searchTerm={searchQuery}
        currentPage={pageQuery}
        totalPages={totalPages}
        perPage={perPageQuery}
        endpoint='projects'
      />

      <div className='mb-10 mt-5 flex justify-between'>
        <p className='text-sm font-medium text-muted-foreground'>
          Showing {noOfPostsShownAlready} of{' '}
          {searchQuery ? filteredProjectsLength : projectsLength} projects
        </p>
        <p className='text-sm font-medium text-muted-foreground'>
          page {pageQuery} of {totalPages}
        </p>
      </div>

      <Projects
        projectsMeta={
          searchQuery ? paginatedFilteredProjectsMeta : projectsMeta
        }
      />
    </section>
  )
}
