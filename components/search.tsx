'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Button } from '@/components/ui/button'
import { CrossIcon } from '@/components/icons'

interface SearchProps {
  endpoint: 'projects' | 'blogs'
  query?: string
  placeholder: string
}

export const Search = ({ endpoint, placeholder, query }: SearchProps) => {
  const router = useRouter()

  const [filterText, setFilterText] = useState<string>(query ?? '')

  const [userQuery] = useDebounce(filterText, 250)

  useEffect(() => {
    if (!userQuery) return router.push(`/${endpoint}`)
    const encodedUrl = `/${endpoint}?q=${encodeURIComponent(userQuery)}`
    router.push(encodedUrl)
  }, [router, endpoint, userQuery])

  const resetFilter = () => setFilterText('')

  return (
    <div className='mb-10 flex items-center gap-3'>
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
          className='h-8 px-2 lg:px-3'
        >
          Reset
          <CrossIcon className='size-5' />
        </Button>
      ) : null}
    </div>
  )
}
