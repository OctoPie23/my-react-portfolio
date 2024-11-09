import BlogsWithSearch from '@/components/blogs-with-search'
import { getBlogPostsWithContent } from '@/lib/blogs'

export default function Page() {
  const blogsWithContent = getBlogPostsWithContent()

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Blogs</h1>
      <BlogsWithSearch blogsWithContent={blogsWithContent} />
    </section>
  )
}
