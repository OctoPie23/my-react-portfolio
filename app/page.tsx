import { HeroIntro } from '@/components/hero-intro'
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
    </section>
  )
}
