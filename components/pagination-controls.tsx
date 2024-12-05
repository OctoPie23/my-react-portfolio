import {
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants'
import Link from 'next/link'

interface PaginationControlProps {
  searchTerm?: string
  currentPage: number
  totalPages: number
  perPage?: number
  endpoint: 'projects' | 'blogs'
}

export const PaginationControls = ({
  searchTerm,
  currentPage,
  totalPages,
  perPage = 5,
  endpoint,
}: PaginationControlProps) => {
  return (
    <nav aria-label='Pagination' className='mt-3 flex justify-between'>
      {currentPage > 1 ? (
        <Link
          href={{
            pathname: endpoint,
            query: {
              ...(searchTerm ? { [SEARCH_QUERY_PARAM]: searchTerm } : {}),
              [PAGE_QUERY_PARAM]: currentPage - 1,
              [PER_PAGE_QUERY_PARAM]: perPage,
            },
          }}
          scroll={false}
          className='inline-flex items-center text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-zinc-500'
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          aria-disabled
          className='text-sm font-semibold text-muted-foreground opacity-75'
        >
          Previous
        </button>
      )}

      {currentPage < totalPages ? (
        <Link
          href={{
            pathname: endpoint,
            query: {
              ...(searchTerm ? { [SEARCH_QUERY_PARAM]: searchTerm } : {}),
              [PAGE_QUERY_PARAM]: currentPage + 1,
              [PER_PAGE_QUERY_PARAM]: perPage,
            },
          }}
          scroll={false}
          className='inline-flex items-center text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-zinc-500'
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          aria-disabled
          className='text-sm font-semibold text-muted-foreground opacity-75'
        >
          Next
        </button>
      )}
    </nav>
  )
}
