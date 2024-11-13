import { HeroIntro } from '@/components/hero-intro'
import { NewsletterForm } from '@/components/newsletter-form'
import RecentBlogs from '@/components/recent-blogs'
import RecentProjects from '@/components/recent-projects'
import { Socials } from '@/components/socials'
import { getBlogPostsWithContent } from '@/lib/blogs'
import {
  PAGE_INDEX_DEFAULT,
  RECENT_BLOGS_DEFAULT,
  RECENT_PROJECTS_DEFAULT,
} from '@/lib/constants'
import { getProjectsMetadata } from '@/lib/projects'

export default function Home() {
  const recentBlogsWithContent = getBlogPostsWithContent({
    page: PAGE_INDEX_DEFAULT,
    perPage: RECENT_BLOGS_DEFAULT,
  })

  const recentPosts = getProjectsMetadata({
    page: PAGE_INDEX_DEFAULT,
    perPage: RECENT_PROJECTS_DEFAULT,
  })

  return (
    <section className='container max-w-3xl'>
      <HeroIntro />

      <RecentBlogs blogsWithContent={recentBlogsWithContent} />

      <RecentProjects projectsMeta={recentPosts} />

      <Socials />

      <NewsletterForm />
    </section>
  )
}
