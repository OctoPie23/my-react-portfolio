export type TBlogCardMetadata = {
  id: string
  title: string
  readTimeInMinutes: number
  brief: string
  publication: {
    id: string
  }
  publishedAt: string
  updatedAt?: string
  slug: string
  tags?: {
    name: string
  }[]
  author: {
    name: string
  }
}

export type TGetBlogsLength = {
  user: {
    posts: {
      totalDocuments: number
    }
  }
}

export type TPostMetadata = {
  id: string
  title: string
  readTimeInMinutes: number
  publishedAt: string
  brief: string
  slug: string
  tags: { name: string }[]
  author: { name: string }
}

export type TGetPostsResponse = {
  publication: {
    posts: {
      edges: {
        node: TPostMetadata
        cursor: string
      }[]
    }
  }
}

export type TGetBlogsSlugs = {
  user: {
    posts: {
      edges: {
        node: {
          slug: string
        }
      }[]
      pageInfo: {
        hasNextPage: boolean
        nextPage: number
      }
    }
  }
}

export type TGetBlogsMetadata = {
  user: {
    posts: {
      edges: {
        node: TBlogCardMetadata
      }[]
      pageInfo: {
        hasNextPage: boolean
        nextPage: number
      }
    }
  }
}

export type TGetBlogsMetadataArgs = {
  pageSize?: number
  page?: number
  all?: boolean
}

export type TSubscribeToNewsletterResponse = {
  data?: {
    subscribeToNewsletter: {
      status: string
    }
  }

  errors?: { message: string }[]
}

export type TGetBlogPostIDBySlugResponse = {
  publication: {
    post: {
      id: string
    }
  }
}

export type TGetBlogBySlugResponse = {
  publication: {
    post: {
      title: string
      subtitle?: string
      readTimeInMinutes: number
      publishedAt: string
      seo: {
        description?: string
      }
      tags?: {
        name: string
      }[]
      coverImage: {
        url?: string
      }
      content: {
        markdown: string
      }
      author: {
        name: string
      }
    }
  }
}

export type TGetBlogByIDResponse = {
  post: {
    title: string
    subtitle?: string
    brief: string
    readTimeInMinutes: number
    publishedAt: string
    seo: {
      description?: string
    }
    tags?: {
      name: string
    }[]
    coverImage: {
      url?: string
    }
    content: {
      markdown: string
    }
    author: {
      name: string
    }
  }
}
