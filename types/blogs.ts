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
  // Hashnode does not provide the author field in their frontmatter
  // This is a custom field that I have added myself.
  author?: string
  ogImage?: string
  tags?: string[]
}