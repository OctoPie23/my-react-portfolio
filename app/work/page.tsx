import { CalendarIcon } from '@/components/icons'
import { NewsletterForm } from '@/components/newsletter-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'My work experiences and engagement with the community.',
}

export default function Page() {
  return (
    <>
      <section className='relative flex flex-col justify-center'>
        <h1 className='title flex items-baseline gap-2'>
          Work
          <span className='text-sm font-semibold text-muted-foreground'>
            (Work in progress)
          </span>
        </h1>

        <div className='prose max-w-full'>
          <p className='text-pretty font-medium text-zinc-800 dark:text-zinc-300'>
            Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
            Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
            risus.
          </p>
        </div>

        <Separator className='my-6' />

        <div className='space-y-14'>
          <article>
            <h2 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-foreground'>
              Microsoft Student Ambassador
            </h2>
            <div className='mb-6 flex items-center gap-2 text-sm'>
              <span className='text-zinc-600 dark:text-zinc-300'>
                Student Ambassador
              </span>
              <time className='text-muted-foreground'>April 2024</time>
            </div>
            <div className='text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              <span>As a</span>
              <HoverCard>
                <HoverCardTrigger
                  asChild
                  // Hack to make the hover card working in mobile phones.
                  tabIndex={0}
                  className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
                >
                  <span>Microsoft</span>
                </HoverCardTrigger>
                <HoverCardContent className='w-80'>
                  <div className='flex justify-between space-x-4'>
                    <Avatar>
                      <AvatarImage src='/images/microsoft.svg' />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-semibold'>Microsoft</h4>
                      <div className='text-pretty text-sm'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </div>
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
              <span>
                student ambassador, ipsum dolor sit amet consectetur adipisicing
                elit. Minus eveniet amet nam at eligendi, voluptatibus beatae ea
                incidunt deserunt culpa illo magni nulla veritatis quae eaque
                animi tenetur? Consequuntur, adipisci.
              </span>
            </div>
            <div className='prose max-w-full'>
              <ul className='mt-4 list-disc space-y-1 text-pretty font-medium text-zinc-900 dark:text-zinc-200'>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>Phasellus imperdiet nulla at dolor facilisis vehicula.</li>
                <li>
                  Suspendisse potenti. Donec non nulla non mi aliquam sodales.
                </li>
                <li>
                  Aenean in magna venenatis, hendrerit libero nec, elementum
                  augue.
                </li>
              </ul>
            </div>
            <p className='mt-4 max-w-full text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              Fusce eleifend, arcu eget dignissim tincidunt, lacus magna
              convallis quam, ac consequat dui arcu eget justo. Sed tristique,
              libero nec efficitur sagittis, velit ipsum feugiat erat, ut
              placerat est magna in velit.
            </p>
          </article>
          <article>
            <h2 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-foreground'>
              Microsoft Student Ambassador
            </h2>
            <div className='mb-6 flex items-center gap-2 text-sm'>
              <span className='text-zinc-600 dark:text-zinc-300'>
                Student Ambassador
              </span>
              <time className='text-muted-foreground'>April 2024</time>
            </div>
            <div className='text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              <span>As a</span>
              <HoverCard>
                <HoverCardTrigger
                  asChild
                  tabIndex={0}
                  className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
                >
                  <span>Microsoft</span>
                </HoverCardTrigger>
                <HoverCardContent className='w-80'>
                  <div className='flex justify-between space-x-4'>
                    <Avatar>
                      <AvatarImage src='/images/microsoft.svg' />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-semibold'>Microsoft</h4>
                      <div className='text-pretty text-sm'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </div>
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
              <span>
                student ambassador, ipsum dolor sit amet consectetur adipisicing
                elit. Minus eveniet amet nam at eligendi, voluptatibus beatae ea
                incidunt deserunt culpa illo magni nulla veritatis quae eaque
                animi tenetur? Consequuntur, adipisci.
              </span>
            </div>
            <div className='prose max-w-full'>
              <ul className='mt-4 list-disc space-y-1 text-pretty font-medium text-zinc-900 dark:text-zinc-200'>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>Phasellus imperdiet nulla at dolor facilisis vehicula.</li>
                <li>
                  Suspendisse potenti. Donec non nulla non mi aliquam sodales.
                </li>
                <li>
                  Aenean in magna venenatis, hendrerit libero nec, elementum
                  augue.
                </li>
              </ul>
            </div>
            <p className='mt-4 max-w-full text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              Fusce eleifend, arcu eget dignissim tincidunt, lacus magna
              convallis quam, ac consequat dui arcu eget justo. Sed tristique,
              libero nec efficitur sagittis, velit ipsum feugiat erat, ut
              placerat est magna in velit.
            </p>
          </article>
          <article>
            <h2 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-foreground'>
              Microsoft Student Ambassador
            </h2>
            <div className='mb-6 flex items-center gap-2 text-sm'>
              <span className='text-zinc-600 dark:text-zinc-300'>
                Student Ambassador
              </span>
              <time className='text-muted-foreground'>April 2024</time>
            </div>
            <div className='text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              <span>As a</span>
              <HoverCard>
                <HoverCardTrigger
                  asChild
                  tabIndex={0}
                  className='mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4'
                >
                  <span>Microsoft</span>
                </HoverCardTrigger>
                <HoverCardContent className='w-80'>
                  <div className='flex justify-between space-x-4'>
                    <Avatar>
                      <AvatarImage src='/images/microsoft.svg' />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-semibold'>Microsoft</h4>
                      <div className='text-pretty text-sm'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </div>
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
              <span>
                student ambassador, ipsum dolor sit amet consectetur adipisicing
                elit. Minus eveniet amet nam at eligendi, voluptatibus beatae ea
                incidunt deserunt culpa illo magni nulla veritatis quae eaque
                animi tenetur? Consequuntur, adipisci.
              </span>
            </div>
            <div className='prose max-w-full'>
              <ul className='mt-4 list-disc space-y-1 text-pretty font-medium text-zinc-900 dark:text-zinc-200'>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>Phasellus imperdiet nulla at dolor facilisis vehicula.</li>
                <li>
                  Suspendisse potenti. Donec non nulla non mi aliquam sodales.
                </li>
                <li>
                  Aenean in magna venenatis, hendrerit libero nec, elementum
                  augue.
                </li>
              </ul>
            </div>
            <p className='mt-4 max-w-full text-pretty font-medium leading-relaxed text-zinc-800 dark:text-zinc-300'>
              Fusce eleifend, arcu eget dignissim tincidunt, lacus magna
              convallis quam, ac consequat dui arcu eget justo. Sed tristique,
              libero nec efficitur sagittis, velit ipsum feugiat erat, ut
              placerat est magna in velit.
            </p>
          </article>
        </div>
      </section>
      <NewsletterForm />
    </>
  )
}
