import { HeroIntro } from '@/components/hero-intro'
import { NewsletterForm } from '@/components/newsletter-form'
import RecentBlogs from '@/components/recent-blogs'
import RecentProjects from '@/components/recent-projects'
import { Socials } from '@/components/socials'
import { getBlogPostsWithContent } from '@/lib/blogs'
import { getProjectsMetadata } from '@/lib/projects'

export default function Home() {
  const blogsWithContent = getBlogPostsWithContent(4)
  const recentPosts = getProjectsMetadata(3)

  return (
    <section className='container max-w-3xl'>
      <HeroIntro />

      <RecentBlogs blogsWithContent={blogsWithContent} />

      <RecentProjects projectsMeta={recentPosts} />

      <Socials />

      <NewsletterForm />
    </section>
  )
}
