'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Button } from '@/components/ui/button'
import { CrossIcon } from '@/components/icons'
import { DEBOUNCE_TIME_DEFAULT } from '@/lib/constants'

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

  const [filterText, setFilterText] = useState<string>(query ?? '')

  const [userQuery] = useDebounce(filterText, debounceTime)

  useEffect(() => {
    if (query === userQuery) return

    const newSearchParams = new URLSearchParams(searchParams)
    if (userQuery) {
      newSearchParams.set('q', userQuery)
    } else {
      newSearchParams.delete('q')
    }

    router.push(`/${endpoint}?${newSearchParams.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userQuery, endpoint])

  const resetFilter = () => setFilterText('')

  return (
    <div className='mb-4 flex items-center gap-3'>
      <Input
        autoFocus
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
          className='h-8 px-2 text-zinc-800 dark:text-zinc-300 lg:px-3'
        >
          Reset
          <CrossIcon className='size-5' />
        </Button>
      ) : null}
    </div>
  )
}
