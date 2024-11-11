import Link from 'next/link'
import { Blogs } from '@/components/blogs'
import { TBlogPost } from '@/types/blogs'

interface RecentPostsProps {
  blogsWithContent: TBlogPost[]
}

export default function RecentPosts({ blogsWithContent }: RecentPostsProps) {
  return (
    <section className='mt-12 pb-24'>
      <h2 className='title'>Recent posts</h2>
      <Blogs blogsWithContent={blogsWithContent} />

      <Link
        href='/blogs'
        className='mt-8 inline-flex items-center gap-2 font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground'
      >
        <span>All posts</span>
      </Link>
    </section>
  )
}
