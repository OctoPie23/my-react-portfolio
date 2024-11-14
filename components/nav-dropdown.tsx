'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HambugerMenuIcon } from '@/components/icons'
import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'

export function NavDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        asChild
        onClick={() => setIsOpen(prev => !prev)}
        className='flex-shrink-0'
      >
        <div className='flex items-center justify-center'>
          <HambugerMenuIcon className='size-6 font-bold' />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className='w-48 p-2'
        align='end'
        onBlur={() => setIsOpen(false)}
      >
        <div className='flex flex-col space-y-1'>
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className='block rounded px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800'
            >
              {link.name}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
