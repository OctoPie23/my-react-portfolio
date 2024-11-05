'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const ToggleThemeIcon = resolvedTheme === 'light' ? MoonIcon : SunIcon

  return (
    <Button
      size='sm'
      variant='ghost'
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <ToggleThemeIcon className='size-4' />
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}
