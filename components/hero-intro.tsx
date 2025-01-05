import Image from 'next/image'
import {
  AlertIcon,
  BookIcon,
  CalendarIcon,
  ChartIcon,
  UsersGroup,
} from '@/components/icons'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

          <div className='my-2 text-pretty font-medium leading-7 text-zinc-800 dark:text-zinc-300'>
            I&apos;m a full-stack developer and DevOps engineer working as a
            freelancer. I also contribute to
            <HoverCard>
              <HoverCardTrigger
                asChild
                tabIndex={0}
                className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
              >
                <span>freeCodeCamp</span>
              </HoverCardTrigger>
              <HoverCardContent className='w-80 font-medium'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src='/images/freeCodeCamp.svg' />
                    <AvatarFallback>FCC</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>freeCodeCamp</h4>
                    <p className='m-0 text-pretty text-sm'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                    <div className='flex items-center pt-2'>
                      <CalendarIcon className='mr-2 size-4' />
                      <span className='text-xs text-muted-foreground'>
                        Joined April 2024
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            and as a Lead Collaborator at
            <HoverCard>
              <HoverCardTrigger
                asChild
                tabIndex={0}
                className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
              >
                <span>Oppia Foundation.</span>
              </HoverCardTrigger>
              <HoverCardContent className='w-80 font-medium'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src='/images/oppia.svg' />
                    <AvatarFallback>O</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>Oppia Foundation</h4>
                    <p className='m-0 text-pretty text-sm'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                    <div className='flex items-center pt-2'>
                      <CalendarIcon className='mr-2 size-4' />
                      <span className='text-xs text-muted-foreground'>
                        Joined April 2024
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            As an
            <HoverCard>
              <HoverCardTrigger
                asChild
                tabIndex={0}
                className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
              >
                <span>MLSA</span>
              </HoverCardTrigger>
              <HoverCardContent className='w-96 font-medium'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src='/images/microsoft.svg' />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>
                      Microsoft Learn Student Ambassador
                    </h4>
                    <p className='m-0 text-pretty text-sm'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                    <div className='flex items-center pt-2'>
                      <CalendarIcon className='mr-2 size-4' />
                      <span className='text-xs text-muted-foreground'>
                        Joined April 2024
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            , I organize a number of online events to grow with the community.
          </div>
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

      <p className='mt-3 max-w-full text-pretty font-medium leading-7 text-zinc-800 dark:text-zinc-300'>
        I enjoy building side projects in my free time that help me automate a
        lot of my stuffs. I love writing about my projects, cloud, web, and
        DevOps.{' '}
        <span className='mr-1 opacity-70 dark:opacity-70'>
          (Oh, and yes, I use Vim and Arch, btw)
        </span>
        <span role='img' aria-label='wink'>
          😉
        </span>
      </p>
    </section>
  )
}
