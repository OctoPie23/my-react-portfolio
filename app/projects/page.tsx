import { AlertIcon } from '@/components/icons'
import { PaginationControls } from '@/components/pagination-controls'
import { FilterDropdown } from '@/components/filter-dropdown'
import { Projects } from '@/components/projects'
import { Search } from '@/components/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  DEBOUNCE_TIME_PROJECTS,
  PAGE_INDEX_DEFAULT,
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  PROJECTS_PER_PAGE_DEFAULT,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants'
import { getProjectsLength, getProjectsMetadata } from '@/lib/projects'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Collection of my selected public repositories fetched through GitHub Actions.',
}

export default function Page({
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

  const projectsLength = searchQuery
    ? filteredProjectsLength
    : getProjectsLength()

  const totalPages = Math.max(Math.ceil(projectsLength / perPageQuery), 0)

  // Redirect if pageQuery exceeds totalPages
  if (totalPages > 0 && pageQuery > totalPages) {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set(PAGE_QUERY_PARAM, String(totalPages))
    redirect(`/projects?${params.toString()}`)
  }

  // Paginate the filtered results
  const paginatedFilteredProjectsMeta = filteredProjectsMeta.slice(
    (pageQuery - 1) * perPageQuery,
    pageQuery * perPageQuery,
  )

  // Update the count displayed to the user
  const noOfPostsShownAlready =
    filteredProjectsLength === 0
      ? 0
      : searchQuery
        ? paginatedFilteredProjectsMeta.length + (pageQuery - 1) * perPageQuery
        : filteredProjectsLength + (pageQuery - 1) * perPageQuery

  return (
    <section>
      <h1 className='title'>Projects</h1>
      <Alert className='mb-4'>
        <AlertIcon className='size-5' />
        <AlertTitle className='text-sm font-semibold uppercase'>
          Heads up!
        </AlertTitle>
        <AlertDescription className='text-sm text-muted-foreground'>
          It does not list all of my projects. To view them all, check out my{' '}
          <a
            href='https://github.com/shricodev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground hover:transition'
          >
            GitHub
          </a>{' '}
          profile.
        </AlertDescription>
      </Alert>

      <Search
        query={searchQuery}
        debounceTime={DEBOUNCE_TIME_PROJECTS}
        endpoint='projects'
        placeholder='Search projects by name or language...'
      />

      <FilterDropdown
        endpoint='projects'
        defaultPerPage={PROJECTS_PER_PAGE_DEFAULT}
      />

      <PaginationControls
        searchTerm={searchQuery}
        currentPage={pageQuery}
        totalPages={totalPages}
        perPage={perPageQuery}
        endpoint='projects'
      />

      <div className='mb-10 mt-5 flex justify-between text-sm font-medium text-muted-foreground'>
        <p>
          Showing {noOfPostsShownAlready} of{' '}
          {searchQuery ? filteredProjectsLength : projectsLength} projects
        </p>
        <p>
          Page {totalPages === 0 ? 0 : pageQuery} of {totalPages}
        </p>
      </div>

      <Projects
        projectsMeta={
          searchQuery ? paginatedFilteredProjectsMeta : projectsMeta
        }
        searchParams={{
          [SEARCH_QUERY_PARAM]: searchQuery,
          [PAGE_QUERY_PARAM]: pageQuery.toString(),
          [PER_PAGE_QUERY_PARAM]: perPageQuery.toString(),
        }}
      />
    </section>
  )
}
