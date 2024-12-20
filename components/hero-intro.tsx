import Image from 'next/image'
import { AlertIcon, BookIcon, ChartIcon, UsersGroup } from '@/components/icons'

export const HeroIntro = () => {
  return (
    <section>
      <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-10'>
        <div className='flex-1'>
          <h1 className='title mb-2 no-underline'>
            Hey, I&#39;m <span className='text-primary'>Shrijal</span>{' '}
            <span role='img' aria-label='waving hand'>
              👋
            </span>
          </h1>
          <p className='subtitle mb-6 text-xl font-semibold text-muted-foreground'>
            Web Dev, Cloud, and DevOps Engineer
          </p>
          <p className='prose my-2 text-pretty font-medium text-zinc-800 dark:text-zinc-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            quam voluptas dolores autem consectetur voluptatem cum quia vero
            voluptatibus iste odit necessitatibus quaerat beatae enim tempora.
          </p>
        </div>

        {/* Desktop Profile Image */}
        <div className='hidden md:block'>
          <Image
            className='rounded-full'
            src='/images/shrijal-acharya.webp'
            alt='Profile photo of Shrijal Acharya'
            width={175}
            height={175}
            priority
            sizes='175px'
          />
        </div>
      </div>

      <div className='my-6 rounded-lg border-none bg-zinc-50 p-4 shadow-sm dark:bg-zinc-900 md:flex md:items-center'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-center'>
            <div className='hidden sm:block md:hidden'>
              <Image
                src='/images/shrijal-acharya.webp'
                alt='Profile photo of Shrijal Acharya'
                width={128}
                height={128}
                className='rounded-full'
                sizes='128px'
              />
            </div>

            {/* Stats Icon Container */}
            <div
              className='hidden h-32 w-32 flex-shrink-0 rounded-xl bg-zinc-100 p-5 dark:bg-zinc-800 md:block'
              aria-hidden='true'
            >
              <ChartIcon className='text-muted-foreground' />
            </div>
          </div>

          <div className='ml-4'>
            <ul className='mt-2 space-y-2 font-normal text-muted-foreground'>
              <li className='flex items-center gap-1'>
                <UsersGroup
                  className='size-5 flex-shrink-0'
                  aria-hidden='true'
                />
                <span>Organized 10+ online events with 500+ developers</span>
              </li>
              <li className='flex items-center gap-1'>
                <BookIcon className='size-5 flex-shrink-0' aria-hidden='true' />
                <span>18+ blog posts all time</span>
              </li>
              <li className='flex items-center gap-1'>
                <AlertIcon
                  className='size-5 flex-shrink-0'
                  aria-hidden='true'
                />
                <span>150,000+ blog views all time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className='prose mt-3 max-w-full text-pretty font-medium text-zinc-800 dark:text-zinc-300'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione quo
        ducimus asperiores eveniet consectetur velit mollitia unde minus
        molestias, quisquam cupiditate.
      </p>
    </section>
  )
}
