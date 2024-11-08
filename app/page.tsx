import { HeroIntro } from '@/components/hero-intro'
import { Socials } from '@/components/socials'

export default function Home() {
  return (
    <section className='container max-w-3xl'>
      <HeroIntro />

      <Socials />
    </section>
  )
}
