import Link from 'next/link'

import { BlogPostMetadata } from '@/lib/blogs'
import { formatDate } from '@/lib/utils'

export const Blogs = ({
  blogsMetadata,
}: {
  blogsMetadata: BlogPostMetadata[]
}) => {
  return (
    <ul className='flex flex-col gap-8'>
      {blogsMetadata.map((blogMetadata) => (
        <li key={blogMetadata.slug}>
          <Link
            href={`/blogs/${blogMetadata.slug}`}
            className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'
          >
            {blogMetadata.datePublished ? (
              <p className='mt-1 text-sm font-light text-muted-foreground'>
                {formatDate(blogMetadata.datePublished, true)}
              </p>
            ) : null}
            <p className='max-w-lg text-lg font-semibold'>
              {blogMetadata.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
