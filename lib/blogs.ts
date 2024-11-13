import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { TBlogPost, TBlogPostMetadata } from '@/types/blogs'
import { BLOGS_PER_PAGE_DEFAULT, PAGE_INDEX_DEFAULT } from '@/lib/constants'

const blogPostsDirectory = path.resolve(process.cwd(), 'content', 'blog-posts')

function parseTags({ tags }: { tags: string | string[] }): string[] {
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(tag => tag.trim())
  }

  if (Array.isArray(tags)) return tags
  return []
}

export function getBlogPostsLength(): number {
  const blogPostFiles = getMDXFiles({ dir: blogPostsDirectory })
  return blogPostFiles.length
}

function getMDXFiles({ dir }: { dir: string }): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map(dirent => dirent.name)
}

export function getBlogPostBySlug({
  slug,
}: {
  slug: string
}): TBlogPost | null {
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
        tags: parseTags({ tags: data.tags }),
      },
      content,
    } as TBlogPost
  } catch (error) {
    console.error(`Error reading blog file: ${blogPostFilePath}`, error)
    return null
  }
}

export function getBlogPostMetadata({
  blogFilePath,
}: {
  blogFilePath: string
}): TBlogPostMetadata | null {
  const blogPostAbsFilePath = path.join(blogPostsDirectory, blogFilePath)
  try {
    const blogFileContent = fs.readFileSync(blogPostAbsFilePath, {
      encoding: 'utf-8',
    })

    const { data } = matter(blogFileContent)
    return {
      ...data,
      author: 'Shrijal Acharya',
      tags: parseTags({ tags: data.tags }),
    } as TBlogPostMetadata
  } catch (error) {
    console.error(
      `Error reading metadata for file: ${blogPostAbsFilePath}`,
      error,
    )
    return null
  }
}

export function getBlogPostsMetadata({
  page = PAGE_INDEX_DEFAULT,
  perPage = BLOGS_PER_PAGE_DEFAULT,
  all = false,
}: {
  page?: number
  perPage?: number
  all?: boolean
}): TBlogPostMetadata[] {
  const blogFiles = getMDXFiles({ dir: blogPostsDirectory })

  if (all) {
    return blogFiles
      .map(file => getBlogPostMetadata({ blogFilePath: file }))
      .filter((metadata): metadata is TBlogPostMetadata => metadata !== null)
      .sort(
        (a, b) =>
          new Date(b.datePublished ?? '').getTime() -
          new Date(a.datePublished ?? '').getTime(),
      )
  }

  const start = (page - 1) * perPage

  return blogFiles
    .map(file => getBlogPostMetadata({ blogFilePath: file }))
    .filter((metadata): metadata is TBlogPostMetadata => metadata !== null)
    .sort(
      (a, b) =>
        new Date(b?.datePublished ?? '').getTime() -
        new Date(a?.datePublished ?? '').getTime(),
    )
    .slice(start, start + perPage)
}

export function getBlogPostsWithContent({
  page = PAGE_INDEX_DEFAULT,
  perPage = BLOGS_PER_PAGE_DEFAULT,
  all = false,
}: {
  page?: number
  perPage?: number
  all?: boolean
}) {
  const blogFiles = getMDXFiles({ dir: blogPostsDirectory })

  if (all) {
    return blogFiles
      .map(file => getBlogPostBySlug({ slug: file.replace(/\.mdx$/, '') }))
      .filter((post): post is TBlogPost => post !== null)
      .sort(
        (a, b) =>
          new Date(b.metadata.datePublished ?? '').getTime() -
          new Date(a.metadata.datePublished ?? '').getTime(),
      )
  }

  const start = (page - 1) * perPage
  const paginatedFiles = blogFiles.slice(start, start + perPage)

  return paginatedFiles
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      return getBlogPostBySlug({ slug })
    })
    .filter((blog): blog is TBlogPost => blog !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.datePublished ?? '').getTime() -
        new Date(a.metadata.datePublished ?? '').getTime(),
    )
}
