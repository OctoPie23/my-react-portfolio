import { Contact } from '@/components/contact'
import { NewsletterForm } from '@/components/newsletter-form'
import { PUBLIC_GMAIL } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Let’s connect! Whether you want to discuss a project, collaborate, or just say hi, feel free to reach out.',
}

export default function Page() {
  return (
    <section>
      <h2 className='title'>Get in touch</h2>
      <div className='prose max-w-full'>
        <p className='font-medium text-zinc-800 dark:text-zinc-300'>
          I’m open to full-time work, freelance and collaborations. Let’s
          connect if you have a project, ideas to discuss, or just want to chat!
        </p>
        <p className='font-medium text-muted-foreground text-zinc-800 dark:text-zinc-300'>
          Feel free to reach out to me at{' '}
          <a
            href={`mailto:${PUBLIC_GMAIL}`}
            className='font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground hover:transition'
          >
            {PUBLIC_GMAIL}
          </a>{' '}
          or through the contact form below.
        </p>
      </div>

      <Contact />
      <NewsletterForm />
    </section>
  )
}
