import { getBlogPostsCardMeta } from '@/lib/blogs'
import { getProjectsMetadata } from '@/lib/projects'
import type { MetadataRoute } from 'next'
import { ROUTES, BASE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const normalizedBaseUrl = BASE_URL.replace(/\/$/, '')
  const { blogs } = await getBlogPostsCardMeta({ all: true })

  const blogPostsMetadata = blogs.map(blog => {
    return {
      url: `${normalizedBaseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt ?? blog.publishedAt).toISOString(),
    }
  })

  const projectsMetadata = getProjectsMetadata({ all: true }).map(project => {
    return {
      url: `${normalizedBaseUrl}/projects/${project.title}`,
      lastModified: new Date(project.updated_at).toISOString(),
    }
  })

  const staticRoutes = ROUTES.map(route => {
    const normalizedRoute = `/${route.replace(/^\/|\/$/g, '')}`
    return {
      url: `${normalizedBaseUrl}${normalizedRoute.replace(/\/+$/, '')}`,
      lastModified: new Date('2024-12-04T00:00:00Z').toISOString(),
    }
  })

  return [...staticRoutes, ...blogPostsMetadata, ...projectsMetadata]
}
