import { getBlogPostsCardMeta } from '@/lib/blogs'
import { BASE_URL, PUBLIC_GMAIL } from '@/lib/constants'
import { getProjectsMetadata } from '@/lib/projects'
import RSS from 'rss'

export async function GET() {
  const rss = new RSS({
    title: 'Shrijal Acharya',
    description:
      'Stay Updated with the latest selected public GitHub repositories and blog posts from Shrijal Acharya.',
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/rss.xml`,
    image_url: `${BASE_URL}/images/shrijal-acharya.jpg`,
    managingEditor: `${PUBLIC_GMAIL} (Shrijal Acharya)`,
    webMaster: `${PUBLIC_GMAIL} (Shrijal Acharya)`,
    copyright: `${new Date().getFullYear()} Shrijal Acharya. All rights reserved.`,
    // Expliicitely set the feed date to 'December 4, 2024' as this is the day when the feed is made public.
    pubDate: new Date('2024-12-04T00:00:00Z'),
    language: 'en',
    categories: ['Blogs', 'Projects'],
    generator: 'RSS Feed for Node and Next.js',
    ttl: 60,
  })

  const { blogs } = await getBlogPostsCardMeta({ all: true })

  for (const blog of blogs) {
    rss.item({
      title: blog.title,
      description: blog.brief,
      url: `${BASE_URL}/blogs/${blog.slug}`,
      date: new Date(blog.publishedAt),
      author: blog.author.name,
      categories: ['Blogs'],
    })
  }

  const projectsMetadata = getProjectsMetadata({ all: true })

  for (const project of projectsMetadata) {
    rss.item({
      title: project.title,
      description: project.description ?? '',
      url: `${BASE_URL}/projects/${project.title}`,
      date: new Date(project.updated_at),
      author: project.author ?? 'Shrijal Acharya',
      categories: ['Projects'],
    })
  }

  const xml = rss.xml()
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
