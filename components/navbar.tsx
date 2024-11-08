'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathName = usePathname()

  const getClassnameForLink = (path: string) =>
    pathName === path
      ? 'underline underline-offset-4 text-foreground'
      : 'text-muted-foreground'

  const links = {
    home: '/',
    blogs: '/blogs',
    about: '/about',
    contact: '/contact-me',
  }

  return (
    <header className='container fixed inset-x-0 top-0 z-50 mx-auto max-w-3xl px-2 py-6 backdrop-blur-sm'>
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
            <li className={getClassnameForLink(links.home)}>
              <Link href={links.home} className='capitalize'>
                home
              </Link>
            </li>
            <li className={getClassnameForLink(links.blogs)}>
              <Link href={links.blogs} className='capitalize'>
                blogs
              </Link>
            </li>
            <li className={getClassnameForLink(links.about)}>
              <Link href={links.about} className='capitalize'>
                about
              </Link>
            </li>
            <li className={getClassnameForLink(links.contact)}>
              <Link href={links.contact} className='capitalize'>
                <span className='hidden sm:inline'>contact me</span>
                <span className='inline sm:hidden'>contact</span>
              </Link>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
