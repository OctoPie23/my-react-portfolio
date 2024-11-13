import Link from 'next/link'
import { Blogs } from '@/components/blogs'
import { TBlogPost } from '@/types/blogs'

interface RecentPostsProps {
  blogsWithContent: TBlogPost[]
}

export default function RecentBlogs({ blogsWithContent }: RecentPostsProps) {
  return (
    <section className='my-16'>
      <h2 className='title'>Recent blogs</h2>
      <Blogs blogsWithContent={blogsWithContent} />

      <Link
        href='/blogs'
        className='mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-zinc-500'
      >
        <span>All blogs</span>
      </Link>
    </section>
  )
}
