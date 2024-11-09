import { BlogPost } from '@/types/blogs'
import { BlogCard } from '@/components/blog-card'

interface BlogsProps {
  blogsWithContent: BlogPost[]
}

export const Blogs = ({ blogsWithContent }: BlogsProps) => {
  return (
    <ul className='flex flex-col gap-8'>
      {blogsWithContent.map(blogWithContent => (
        <li
          key={`${blogWithContent.metadata.cuid}_${blogWithContent.metadata.slug}`}
        >
          <BlogCard blogWithContent={blogWithContent} />
        </li>
      ))}
    </ul>
  )
}
