'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader, SunIcon, MoonIcon } from '@/components/icons'

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <Button size='sm' variant='ghost' disabled>
        <Loader className='h-5 w-5 animate-spin text-zinc-400' />
        <span className='sr-only'>Loading...</span>
      </Button>
    )

  const ToggleThemeIcon =
    resolvedTheme === 'light' ? (
      <MoonIcon className='size-5 text-zinc-900' />
    ) : (
      <SunIcon className='size-5 text-orange-300' />
    )

  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      {ToggleThemeIcon}
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}
