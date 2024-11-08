import { Blogs } from '@/components/blogs'
import { getBlogPostsMetadata } from '@/lib/blogs'

export default async function Page() {
  const blogsMetadata = await getBlogPostsMetadata()

  return (
    <section className='container max-w-3xl'>
      <h1 className='mb-12 text-3xl font-bold'>Blogs</h1>
      <Blogs blogsMetadata={blogsMetadata} />
    </section>
  )
}
