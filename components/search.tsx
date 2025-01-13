'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Button } from '@/components/ui/button'
import { CrossIcon } from '@/components/icons'
import {
  DEBOUNCE_TIME_DEFAULT,
  PAGE_INDEX_DEFAULT,
  PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants'
import { useMediaQuery } from 'react-responsive'

interface SearchProps {
  endpoint: 'projects' | 'blogs'
  query?: string
  placeholder: string
  debounceTime?: number
}

export const Search = ({
  endpoint,
  placeholder,
  query,
  debounceTime = DEBOUNCE_TIME_DEFAULT,
}: SearchProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [filterText, setFilterText] = useState<string>(query ?? '')

  const [userQuery] = useDebounce(filterText, debounceTime)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (filterText !== query) setFilterText(query ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    if (!isMounted || query === userQuery) return

    const newSearchParams = new URLSearchParams(searchParams)

    if (userQuery) {
      // Reset to first page whenever search query changes
      newSearchParams.set(PAGE_QUERY_PARAM, PAGE_INDEX_DEFAULT.toString())
      newSearchParams.set(SEARCH_QUERY_PARAM, userQuery)
    } else {
      newSearchParams.delete(SEARCH_QUERY_PARAM)
    }

    router.push(`/${endpoint}?${newSearchParams.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userQuery, endpoint])

  const resetFilter = () => setFilterText('')

  return (
    <div className='mb-4 flex items-center gap-3'>
      <Input
        // Apply autoFocus only on client-side and in bigger screens
        autoFocus={isMounted && isDesktopOrLaptop}
        type='text'
        placeholder={placeholder}
        className='h-9 w-full sm:w-1/2'
        value={filterText}
        onChange={event => setFilterText(event.target.value)}
      />

      {filterText.length > 0 ? (
        <Button
          size='default'
          variant='secondary'
          onClick={resetFilter}
          className='h-8 px-2 text-zinc-700 dark:text-zinc-400 lg:px-3'
        >
          Reset
          <CrossIcon className='size-5' />
        </Button>
      ) : null}
    </div>
  )
}
