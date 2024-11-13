import { getBlogPostBySlug, getBlogPostsMetadata } from '@/lib/blogs'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@/components/icons'
import { formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge, badgeVariants } from '@/components/ui/badge'
import MDXContent from '@/components/mdx-content'
import { UserAvatar } from '@/components/user-avatar'

interface Props {
  params: {
    slug: string
  }
}

// Static Site Generation (SSG) to improve performance on static contents.
export async function generateStaticParams() {
  const blogPostsMetadata = getBlogPostsMetadata({ all: true })
  const blogPostsSlugs = blogPostsMetadata.map(post => ({ slug: post.slug }))

  return blogPostsSlugs
}

export default function Page({ params: { slug } }: Props) {
  const post = getBlogPostBySlug({ slug })
  if (!post) notFound()

  const { metadata, content } = post

  const { title, author, cover, tags } = metadata

  const postDate = formatDate({ date: metadata.datePublished })

  return (
    <section className='pb-24'>
      <div className='container max-w-3xl'>
        <Link
          href='/blogs'
          className={buttonVariants({
            variant: 'secondary',
            className: 'mb-8 flex gap-2',
          })}
        >
          <ArrowLeftIcon className='size-5' />
          Back to posts
        </Link>

        {cover ? (
          <div className='relative mb-6 w-full overflow-hidden rounded-lg'>
            <Image src={cover} alt={title} width={700} height={365} />
          </div>
        ) : null}

        <header>
          <h1 className='text-3xl font-bold decoration-border/75 decoration-2'>
            {title}
          </h1>

          <div className='mt-3 flex items-center'>
            <Link href='/contact-me' className='flex items-center'>
              <UserAvatar className='mr-2 size-8' />
              {author ? (
                <span className='text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2'>
                  {author}
                </span>
              ) : null}
              <span className='mr-1 sm:mx-1'>•</span>
            </Link>
            {postDate ? (
              <span className='text-sm text-muted-foreground'>{postDate}</span>
            ) : null}
          </div>

          {tags && tags.length > 0 ? (
            <div className='mt-4 flex flex-row flex-wrap gap-2'>
              {tags.map(tag => (
                <Badge
                  key={tag}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>

        <main className='prose mt-16 max-w-3xl px-4 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
