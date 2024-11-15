import { BlogCard } from '@/components/blog-card'
import { TBlogCardMetadata } from '@/types/blogs'

interface BlogsProps {
  blogsWithMeta: TBlogCardMetadata[]
}

export const Blogs = ({ blogsWithMeta }: BlogsProps) => {
  return (
    <>
      {blogsWithMeta && blogsWithMeta.length === 0 ? (
        <p className='text-sm font-medium text-muted-foreground'>
          No results found
        </p>
      ) : (
        <ul className='flex flex-col gap-8'>
          {blogsWithMeta?.length &&
            blogsWithMeta.map(blogMeta => (
              <li key={`${blogMeta.slug}_${blogMeta.readTimeInMinutes}`}>
                <BlogCard blogWithMeta={blogMeta} />
              </li>
            ))}
        </ul>
      )}
    </>
  )
}
