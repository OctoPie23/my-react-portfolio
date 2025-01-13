export type TBlogCardMetadata = {
  id: string
  title: string
  readTimeInMinutes: number
  brief?: string
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

export type TGetBlogsCount = {
  user?: {
    posts?: {
      totalDocuments: number
    }
  }
}

export type TGetBlogsSlugs = {
  user?: {
    posts?: {
      edges?: {
        node?: {
          slug: string
        }
      }[]
      pageInfo?: {
        hasNextPage: boolean
        nextPage: number
      }
    }
  }
}

export type TGetBlogsMetadata = {
  user?: {
    posts?: {
      edges?: {
        node?: TBlogCardMetadata
      }[]
      pageInfo?: {
        hasNextPage: boolean
        nextPage: number
      }
    }
  }
}

export type TSubscribeToNewsletterResponse = {
  data?: {
    subscribeToNewsletter?: {
      status: string
    }
  }

  errors?: { message: string }[]
}

export type TGetBlogPostIDBySlugResponse = {
  publication?: {
    post?: {
      id: string
    }
  }
}

export type TGetBlogByIDResponse = {
  post?: {
    title: string
    subtitle?: string
    brief?: string
    readTimeInMinutes: number
    publishedAt: string
    seo?: {
      description?: string
    }
    tags?: {
      name: string
    }[]
    coverImage?: {
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
