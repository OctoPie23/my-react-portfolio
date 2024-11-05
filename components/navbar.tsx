import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export const Navbar = () => {
  return (
    <header className='container fixed inset-x-0 top-0 z-50 mx-auto max-w-xl px-2 py-6 backdrop-blur-sm sm:px-0'>
      <nav className='flex items-center justify-between'>
        <div className='hidden sm:flex'>
          <Link href='/' className='text-2xl font-bold uppercase'>
            shricodev
          </Link>
        </div>

        <div className='ml-0 flex items-center justify-between gap-6 font-semibold text-muted-foreground sm:ml-auto'>
          <ul className='flex items-center gap-6'>
            <li className='underline underline-offset-2 transition-colors hover:text-foreground/80'>
              <Link href='/blogs' className='capitalize'>
                blogs
              </Link>
            </li>
            <li className='underline underline-offset-2 transition-colors hover:text-foreground/80'>
              <Link href='/about' className='capitalize'>
                about
              </Link>
            </li>
            <li className='underline underline-offset-2 transition-colors hover:text-foreground/80'>
              <Link href='/contact' className='capitalize'>
                contact me
              </Link>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
