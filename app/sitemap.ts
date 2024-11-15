import { getBlogPostsCardMeta } from '@/lib/blogs'
import { getProjectsMetadata } from '@/lib/projects'
import type { MetadataRoute } from 'next'
import { ROUTES, BASE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const normalizedBaseUrl = BASE_URL.replace(/\/$/, '')
  const { posts } = await getBlogPostsCardMeta({ all: true })

  const blogPostsMetadata = posts.map(post => {
    return {
      url: `${normalizedBaseUrl}/blogs/${post.slug}`,
      lastModified: new Date(post.publishedAt).toISOString(),
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
      url: `${normalizedBaseUrl}${normalizedRoute}`,
      lastModified: new Date().toISOString().split('T')[0],
    }
  })

  return [...staticRoutes, ...blogPostsMetadata, ...projectsMetadata]
}
