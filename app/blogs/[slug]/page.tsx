import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/icons'
import { formatDate, parseMDX } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import MDXContent from '@/components/mdx-content'
import { UserAvatar } from '@/components/user-avatar'
import {
  getAllBlogPostsSlug,
  getBlogPostByID,
  getBlogPostIDBySlug,
} from '@/lib/blogs'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  params: {
    slug: string
  }
}

// Static Site Generation (SSG) to improve performance on static contents.
export async function generateStaticParams() {
  const response = await getAllBlogPostsSlug()
  const slugs = response?.slugs.map(blogSlug => ({
    slug: blogSlug.slug,
  }))
  return slugs
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata | null> {
  const getBlogIDResponse = await getBlogPostIDBySlug({ slug })
  if (!getBlogIDResponse) notFound()

  const {
    publication: {
      post: { id },
    },
  } = getBlogIDResponse

  const getBlogPostByIdResponse = await getBlogPostByID({ id })
  if (!getBlogPostByIdResponse) notFound()

  const { post } = getBlogPostByIdResponse

  return {
    title: post.title,
    description: post.seo.description || post.brief,
    openGraph: {
      title: post.title,
      description: post.seo.description || post.brief,
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
      description: post.seo.description || post.brief,
      ...(post.coverImage?.url && { images: [{ url: post.coverImage.url }] }),
    },
  }
}

export default async function Page({ params: { slug } }: Props) {
  // NOTE: I am fetching the postId by slug but not the post by id here, because
  // I don't want to pollute the URL by including the postId anywhere like in the path or
  // in the query params.
  const getBlogIDResponse = await getBlogPostIDBySlug({ slug })
  if (!getBlogIDResponse) notFound()

  const {
    publication: {
      post: { id },
    },
  } = getBlogIDResponse

  const getBlogPostByIdResponse = await getBlogPostByID({ id })
  if (!getBlogPostByIdResponse) notFound()

  const { post } = getBlogPostByIdResponse

  const postContent = parseMDX({ markdown: post.content.markdown })

  return (
    <section className='pb-10'>
      <Suspense
        fallback={
          <Button disabled variant='secondary' className='mb-8 flex gap-2'>
            <ArrowLeftIcon className='size-5' />
            Back to blogs
          </Button>
        }
      >
        <BackButton endpoint='blogs' />
      </Suspense>

      {post.coverImage && post.coverImage.url ? (
        <div className='relative mb-6 w-full'>
          <Image
            src={post.coverImage.url}
            alt={post.title}
            width={750}
            height={380}
            className='rounded-md object-cover'
            priority
            // Make sure that GIFs are set to unoptimized else the animation will not work.
            unoptimized={post.coverImage.url.toLowerCase().endsWith('.gif')}
          />
        </div>
      ) : null}

      <header>
        <h1 className='text-3xl font-bold decoration-border/75 decoration-2'>
          {post.title}
        </h1>

        {post.subtitle ? (
          <p className='py-3 text-xl font-semibold text-muted-foreground'>
            {post.subtitle}
          </p>
        ) : null}

        <div className='mt-3 flex items-center'>
          <Link href='/contact' className='flex items-center'>
            <UserAvatar className='mr-2 size-8' />
            {post.author?.name ? (
              <span className='hidden text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2 sm:inline'>
                {post.author?.name}
              </span>
            ) : null}
            <span className='divider mr-1 sm:mx-1'>•</span>
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
                variant='secondary'
                className={'text-zinc-600 dark:text-zinc-300'}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        ) : null}
      </header>
      <main className='prose mt-12 max-w-3xl dark:prose-invert'>
        <MDXContent source={postContent} />
      </main>
      <div className='mt-10 flex items-center gap-4 text-sm font-medium text-muted-foreground'>
        <div className='flex items-center gap-1 hover:text-foreground hover:transition'>
          <ArrowUpRightIcon className='size-4' />
          <a
            href='https://dev.to/shricodev'
            target='_blank'
            rel='noreferrer noopener'
          >
            DEV
          </a>
        </div>

        <div className='flex items-center gap-1 hover:text-foreground hover:transition'>
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
