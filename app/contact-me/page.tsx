import { ContactMe } from '@/components/contact-me'
import { NewsletterForm } from '@/components/newsletter-form'

export default function Contact() {
  return (
    <section className='container max-w-3xl'>
      <h2 className='title'>Get in touch</h2>
      <p className='font-light text-muted-foreground'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
        maxime neque numquam quia quis facere atque incidunt dolorem sed!
      </p>
      <br />
      <p className='font-light text-muted-foreground'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
        maxime neque numquam quia quis facere atque incidunt dolorem sed!
      </p>

      <ContactMe />
      <NewsletterForm />
    </section>
  )
}
