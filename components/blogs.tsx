import { TBlogPost } from '@/types/blogs'
import { BlogCard } from '@/components/blog-card'

interface BlogsProps {
  blogsWithContent: TBlogPost[]
}

export const Blogs = ({ blogsWithContent }: BlogsProps) => {
  return (
    <>
      {blogsWithContent.length === 0 ? (
        <p className='text-sm font-medium text-muted-foreground'>
          No results found
        </p>
      ) : (
        <ul className='flex flex-col gap-8'>
          {blogsWithContent.map(blogWithContent => (
            <li
              key={`${blogWithContent.metadata.cuid}_${blogWithContent.metadata.slug}`}
            >
              <BlogCard blogWithContent={blogWithContent} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
