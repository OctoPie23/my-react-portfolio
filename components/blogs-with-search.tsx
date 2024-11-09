'use client'

import { useState } from 'react'
import { BlogPost } from '@/types/blogs'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CrossIcon } from '@/components/icons'
import { Blogs } from '@/components/blogs'

interface PostsWithSearchProps {
  blogsWithContent: BlogPost[]
}

export default function BlogsWithSearch({
  blogsWithContent: blogsMeta,
}: PostsWithSearchProps) {
  const [filterText, setFilterText] = useState<string>('')
  const filteredBlogPostsMeta = blogsMeta.filter(post =>
    post.metadata.title?.toLowerCase().includes(filterText.toLowerCase()),
  )

  const resetFilter = () => setFilterText('')

  return (
    <>
      <div className='mb-10 flex items-center gap-3'>
        <Input
          autoFocus
          type='text'
          placeholder='Search blogs...'
          className='h-9 w-full sm:w-1/2'
          value={filterText}
          onChange={event => setFilterText(event.target.value)}
        />
        {filterText.length > 0 && (
          <Button
            size='default'
            variant='secondary'
            onClick={resetFilter}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <CrossIcon className='size-5' />
          </Button>
        )}
      </div>

      {filterText && filteredBlogPostsMeta.length === 0 ? (
        <p className='text-sm text-zinc-400'>No results found.</p>
      ) : (
        <Blogs blogsWithContent={filteredBlogPostsMeta} />
      )}
    </>
  )
}
