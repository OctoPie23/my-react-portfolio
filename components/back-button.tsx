'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeftIcon } from '@/components/icons'
import { useSearchParams } from 'next/navigation'
import {
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants'

interface BackButtonProps {
  endpoint: 'projects' | 'blogs'
}

export const BackButton = ({ endpoint }: BackButtonProps) => {
  const searchParams = useSearchParams()

  const pageQueryParam = searchParams.get(PAGE_QUERY_PARAM)
  const perPageQueryParam = searchParams.get(PER_PAGE_QUERY_PARAM)
  const searchQueryParam = searchParams.get(SEARCH_QUERY_PARAM)

  return (
    <Link
      href={{
        pathname: `/${endpoint}`,
        query: {
          ...(pageQueryParam ? { [PAGE_QUERY_PARAM]: pageQueryParam } : {}),
          ...(perPageQueryParam
            ? { [PER_PAGE_QUERY_PARAM]: perPageQueryParam }
            : {}),
          ...(searchQueryParam
            ? { [SEARCH_QUERY_PARAM]: searchQueryParam }
            : {}),
        },
      }}
      className={buttonVariants({
        variant: 'secondary',
        className: 'mb-8 flex gap-2',
      })}
    >
      <ArrowLeftIcon className='size-5' />
      Back to {endpoint}
    </Link>
  )
}
