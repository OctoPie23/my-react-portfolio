import { ContactMe } from '@/components/contact-me'
import { NewsletterForm } from '@/components/newsletter-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with me',
}

export default function Page() {
  return (
    <section className='container max-w-3xl'>
      <h2 className='title'>Get in touch</h2>
      <p className='text-zinc-800 dark:text-zinc-300'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
        maxime neque numquam quia quis facere atque incidunt dolorem sed!
      </p>
      <br />
      <p className='text-muted-foreground text-zinc-800 dark:text-zinc-300'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
        maxime neque numquam quia quis facere atque incidunt dolorem sed!
      </p>

      <ContactMe />
      <NewsletterForm />
    </section>
  )
}
