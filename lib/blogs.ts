import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { BlogPost, BlogPostMetadata } from '@/types/blogs'

const blogPostsDirectory = path.resolve(process.cwd(), 'content', 'blog-posts')

function parseTags(tags: string | string[]): string[] {
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(tag => tag.trim())
  }

  if (Array.isArray(tags)) return tags
  return []
}

function getMDXFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map(dirent => dirent.name)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const blogPostFilePath = path.join(blogPostsDirectory, `${slug}.mdx`)

  try {
    const blogFileContent = fs.readFileSync(blogPostFilePath, {
      encoding: 'utf-8',
    })

    const { data, content } = matter(blogFileContent)

    return {
      metadata: {
        ...data,
        author: 'Shrijal Acharya',
        tags: parseTags(data.tags),
      },
      content,
    } as BlogPost
  } catch {
    return null
  }
}

export function getBlogPostsMetadata(limit?: number): BlogPostMetadata[] {
  const blogFiles = getMDXFiles(blogPostsDirectory)

  const blogPostsMetadata = blogFiles
    .map(getBlogPostMetadata)
    .sort(
      (a, b) =>
        new Date(b.datePublished ?? '').getTime() -
        new Date(a.datePublished ?? '').getTime(),
    )

  return limit ? blogPostsMetadata.slice(0, limit) : blogPostsMetadata
}

export function getBlogPostMetadata(blogFilePath: string): BlogPostMetadata {
  const blogPostAbsFilePath = path.join(blogPostsDirectory, blogFilePath)
  const blogFileContent = fs.readFileSync(blogPostAbsFilePath, {
    encoding: 'utf-8',
  })

  const { data } = matter(blogFileContent)
  return {
    ...data,
    author: 'Shrijal Acharya',
    tags: parseTags(data.tags),
  } as BlogPostMetadata
}

export function getBlogPostsWithContent(limit?: number) {
  const blogFiles = getMDXFiles(blogPostsDirectory)

  const allBlogPosts = blogFiles.map(file => {
    const slug = file.replace(/\.mdx$/, '')
    return getBlogPostBySlug(slug)
  }) as BlogPost[]

  return limit ? allBlogPosts.slice(0, limit) : allBlogPosts
}