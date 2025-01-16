import { CustomHoverCard } from '@/components/custom-hover-card'
import { NewsletterForm } from '@/components/newsletter-form'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Take a look at my professional journey, projects I’ve worked on, and my involvement with the community.',
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
              <CustomHoverCard
                triggerText='Microsoft'
                title='Microsoft Learn Student Ambassador'
                description='Global group of campus leaders who are eager to help fellow students, lead in their tech community.'
                dateText='Joined April 2024'
                avatarSrc='/images/microsoft.svg'
                avatarFallback='MS'
              />
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
              <CustomHoverCard
                triggerText='Microsoft'
                title='Microsoft Learn Student Ambassador'
                description='Global group of campus leaders who are eager to help fellow students, lead in their tech community.'
                dateText='Joined April 2024'
                avatarSrc='/images/microsoft.svg'
                avatarFallback='MS'
              />
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
