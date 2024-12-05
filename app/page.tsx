import { HeroIntro } from '@/components/hero-intro'
import { NewsletterForm } from '@/components/newsletter-form'
import RecentBlogs from '@/components/recent-blogs'
import RecentProjects from '@/components/recent-projects'
import { Socials } from '@/components/socials'
import {
  PAGE_INDEX_DEFAULT,
  RECENT_BLOGS_DEFAULT,
  RECENT_PROJECTS_DEFAULT,
} from '@/lib/constants'
import { getBlogPostsCardMeta } from '@/lib/blogs'
import { getProjectsMetadata } from '@/lib/projects'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Shrijal Acharya',
    description: 'Shrijal Acharya',
    openGraph: {
      title: 'Shrijal Acharya',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shrijal Acharya',
      description: 'Shrijal Acharya',
    },
  }
}

export default async function Home() {
  const { blogs } = await getBlogPostsCardMeta({
    page: PAGE_INDEX_DEFAULT,
    pageSize: RECENT_BLOGS_DEFAULT,
  })

  const recentPosts = getProjectsMetadata({
    page: PAGE_INDEX_DEFAULT,
    perPage: RECENT_PROJECTS_DEFAULT,
  })

  return (
    <>
      <HeroIntro />

      <RecentBlogs blogPosts={blogs} />

      <RecentProjects projectsMeta={recentPosts} />

      <Socials />

      <NewsletterForm />
    </>
  )
}
