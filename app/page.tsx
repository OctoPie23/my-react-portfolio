import { HeroIntro } from '@/components/hero-intro'
import { NewsletterForm } from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-blogs'
import { Socials } from '@/components/socials'
import { getBlogPostsWithContent } from '@/lib/blogs'

export default function Home() {
  const blogsWithContent = getBlogPostsWithContent(4)

  return (
    <section className='container max-w-3xl'>
      <HeroIntro />

      <RecentPosts blogsWithContent={blogsWithContent} />

      <Socials />

      <NewsletterForm />
    </section>
  )
}
