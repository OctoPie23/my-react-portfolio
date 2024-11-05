import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='mt-40 flex flex-col items-center justify-center text-center'>
      <h1 className='text-9xl font-bold text-zinc-700'>404</h1>
      <p className='mt-4 text-xl text-zinc-600'>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href='/'
        className={buttonVariants({
          size: 'lg',
          variant: 'outline',
          className: 'mt-4 text-zinc-400',
        })}
      >
        Go Back Home
      </Link>
    </div>
  )
}
