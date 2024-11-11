'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathName = usePathname()

  const getClassnameForLink = (path: string) =>
    pathName === path
      ? 'underline underline-offset-4 text-foreground capitalize'
      : 'text-muted-foreground capitalize hover:text-zinc-600 dark:hover:text-zinc-500'

  const links = {
    home: '/',
    blogs: '/blogs',
    projects: '/projects',
    work: '/work',
    contact: '/contact-me',
  }

  return (
    <header className='container fixed inset-x-0 top-0 z-50 mx-auto max-w-3xl px-4 py-6 backdrop-blur-sm'>
      <nav className='flex items-center justify-between'>
        <div className='hidden sm:flex'>
          <Link
            href={links.home}
            className='select-none text-2xl font-bold uppercase'
          >
            shricodev
          </Link>
        </div>

        <div className='ml-0 flex items-center justify-between gap-6 font-semibold text-muted-foreground sm:ml-auto'>
          <ul className='flex items-center gap-6'>
            {Object.entries(links).map(([key, value]) => (
              <li key={key}>
                <Link href={value} className={getClassnameForLink(value)}>
                  {key === 'contact' ? (
                    <>
                      <span className='hidden sm:inline'>contact me</span>
                      <span className='inline sm:hidden'>contact</span>
                    </>
                  ) : (
                    key
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
