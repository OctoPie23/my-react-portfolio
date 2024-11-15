import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/icons'
import { formatDate, parseMDX } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge, badgeVariants } from '@/components/ui/badge'
import MDXContent from '@/components/mdx-content'
import { UserAvatar } from '@/components/user-avatar'
import { getBlogPostByID, getBlogPostIDBySlug } from '@/lib/blogs'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata | null> {
  const postId = await getBlogPostIDBySlug({ slug })
  if (!postId) return null

  const { post } = await getBlogPostByID({ id: postId })
  if (!post) return null

  return {
    title: post.title,
    ...(post.seo.description && { description: post.seo.description }),
    openGraph: {
      title: post.title,
      description: post.seo.description,
      url: `${BASE_URL}/blogs/${slug}`,
      ...(post.coverImage?.url && {
        images: [
          {
            url: post.coverImage.url,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      ...(post.seo.description && { description: post.seo.description }),
      ...(post.coverImage?.url && { images: [post.coverImage.url] }),
    },
  }
}

export default async function Page({ params: { slug } }: Props) {
  const postId = await getBlogPostIDBySlug({ slug })
  console.log(postId)
  if (!postId) notFound()

  const { post } = await getBlogPostByID({ id: postId })
  if (!post) notFound()

  const postContent = parseMDX({ markdown: post.content.markdown })

  return (
    <section className='container max-w-3xl pb-10'>
      <Link
        href='/blogs'
        className={buttonVariants({
          variant: 'secondary',
          className: 'mb-8 flex gap-2',
        })}
      >
        <ArrowLeftIcon className='size-5' />
        Back to blogs
      </Link>

      {post.coverImage && post.coverImage.url ? (
        post.coverImage.url.endsWith('.gif') ? (
          <div className='relative mb-6 w-full overflow-hidden rounded-lg'>
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={700}
              height={365}
              // Ensure GIFs are rendered properly.
              unoptimized={true}
            />
          </div>
        ) : (
          <div className='relative mb-6 w-full overflow-hidden rounded-lg'>
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={700}
              height={365}
            />
          </div>
        )
      ) : null}

      <header>
        <h1 className='text-3xl font-bold decoration-border/75 decoration-2'>
          {post.title}
        </h1>

        {post.subtitle ? (
          <h2 className='py-3 text-xl font-semibold text-muted-foreground'>
            {post.subtitle}
          </h2>
        ) : null}

        <div className='mt-3 flex items-center'>
          <Link href='/contact-me' className='flex items-center'>
            <UserAvatar className='mr-2 size-8' />
            {post.author?.name ? (
              <span className='text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2'>
                {post.author?.name}
              </span>
            ) : null}
            <span className='mr-1 text-muted-foreground sm:mx-1'>•</span>
          </Link>
          {post.publishedAt ? (
            <span className='text-sm text-muted-foreground'>
              {formatDate({ date: post.publishedAt, short: false })}
            </span>
          ) : null}
        </div>

        {post.tags && post.tags.length > 0 ? (
          <div className='mt-4 flex flex-row flex-wrap gap-2'>
            {post.tags.map(tag => (
              <Badge
                key={tag.name}
                className={badgeVariants({ variant: 'secondary' })}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        ) : null}
      </header>

      <main className='prose mt-12 max-w-3xl px-4 dark:prose-invert'>
        <MDXContent source={postContent} />
      </main>

      <div className='mt-10 flex gap-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-1 font-medium text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400'>
          <ArrowUpRightIcon className='size-4' />
          <a
            href='https://dev.to/shricodev'
            target='_blank'
            rel='noreferrer noopener'
          >
            DEV
          </a>
        </div>

        <div className='flex items-center gap-1 font-medium text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400'>
          <ArrowUpRightIcon className='size-4' />
          <a
            href='https://shricodev.hashnode.dev'
            target='_blank'
            rel='noreferrer noopener'
          >
            Hashnode
          </a>
        </div>
      </div>
    </section>
  )
}
