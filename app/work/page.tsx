import { NewsletterForm } from '@/components/newsletter-form'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'My work experiences and engagement with the community.',
}

export default function Page() {
  return (
    <>
      <section className='container relative flex max-w-3xl flex-col justify-center'>
        <h1 className='title'>Work</h1>

        <p className='prose max-w-full text-zinc-800 dark:text-zinc-300'>
          Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
          Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
          risus.
        </p>

        <Separator className='my-8' />

        <section className='space-y-16'>
          <article>
            <h3 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-white'>
              Microsoft Student Ambassador
            </h3>
            <p className='flex items-center gap-2 text-sm'>
              <span className='text-zinc-500 dark:text-zinc-400'>
                Developer
              </span>
              <time className='text-zinc-400 dark:text-zinc-500'>
                February 2022
              </time>
            </p>
            <p className='mt-2 text-zinc-800 dark:text-zinc-300'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
              iusto quo reprehenderit accusantium autem, ipsa tempore, amet
              natus tenetur, repellat ipsam at minus veniam quod accusamus ea
              officia ipsum assumenda.
            </p>
          </article>

          <article>
            <h3 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-white'>
              Microsoft Student Ambassador
            </h3>
            <p className='flex items-center gap-2 text-sm'>
              <span className='text-zinc-500 dark:text-zinc-400'>
                Developer
              </span>
              <time className='text-zinc-400 dark:text-zinc-500'>
                February 2022
              </time>
            </p>
            <p className='mt-2 text-zinc-800 dark:text-zinc-300'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              tenetur atque? Beatae soluta quaerat, nihil exercitationem
              asperiores eveniet, minus, ut explicabo ipsum totam odit labore
              assumenda facilis reprehenderit placeat incidunt.
            </p>
          </article>

          <article>
            <h3 className='mb-2 text-lg font-semibold text-zinc-900 dark:text-white'>
              Microsoft Student Ambassador
            </h3>
            <p className='flex items-center gap-2 text-sm'>
              <span className='text-zinc-500 dark:text-zinc-400'>
                Developer
              </span>
              <time className='text-zinc-400 dark:text-zinc-500'>
                February 2022
              </time>
            </p>
            <p className='mt-2 text-zinc-800 dark:text-zinc-300'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              eveniet amet nam at eligendi, voluptatibus beatae ea incidunt
              deserunt culpa illo magni nulla veritatis quae eaque animi
              tenetur? Consequuntur, adipisci.
            </p>
            <ul className='mt-4 list-inside list-disc space-y-1 text-zinc-900 dark:text-zinc-200'>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Phasellus imperdiet nulla at dolor facilisis vehicula.</li>
              <li>
                Suspendisse potenti. Donec non nulla non mi aliquam sodales.
              </li>
              <li>
                Aenean in magna venenatis, hendrerit libero nec, elementum
                augue.
              </li>
            </ul>
            <p className='mt-4 text-zinc-800 dark:text-zinc-300'>
              Fusce eleifend, arcu eget dignissim tincidunt, lacus magna
              convallis quam, ac consequat dui arcu eget justo. Sed tristique,
              libero nec efficitur sagittis, velit ipsum feugiat erat, ut
              placerat est magna in velit.
            </p>
          </article>
        </section>
      </section>
      <NewsletterForm />
    </>
  )
}
