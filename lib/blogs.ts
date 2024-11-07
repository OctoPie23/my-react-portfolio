import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export type BlogPost = {
  metadata: BlogPostMetadata
  content: string
}

export type BlogPostMetadata = {
  title: string
  seoTitle?: string
  seoDescription?: string
  datePublished: string
  cuid: string
  slug: string
  cover?: string
  ogImage?: string
  tags?: string[]
}

const blogPostsDirectory = path.resolve(process.cwd(), 'content', 'blog-posts')

function getMDXFiles(dir: string) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map((dirent) => dirent.name)
}

export async function getBlogPostsBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const blogPostFilePath = path.join(blogPostsDirectory, `${slug}.mdx`)

  try {
    const blogFileContent = fs.readFileSync(blogPostFilePath, {
      encoding: 'utf-8',
    })

    const { data, content } = matter(blogFileContent)

    return { metadata: data as BlogPostMetadata, content }
  } catch {
    return null
  }
}

export async function getBlogPosts(
  limit?: number,
): Promise<BlogPostMetadata[]> {
  const blogFiles = getMDXFiles(blogPostsDirectory)

  const blogPosts = blogFiles
    .map(getPostMetadata)
    .sort(
      (a, b) =>
        new Date(b.datePublished ?? '').getTime() -
        new Date(a.datePublished ?? '').getTime(),
    )

  return limit ? blogPosts.slice(0, limit) : blogPosts
}

export function getPostMetadata(blogFilePath: string): BlogPostMetadata {
  const blogPostAbsFilePath = path.join(blogPostsDirectory, blogFilePath)
  const blogFileContent = fs.readFileSync(blogPostAbsFilePath, {
    encoding: 'utf8',
  })

  const { data } = matter(blogFileContent)
  return { ...data } as BlogPostMetadata
}
