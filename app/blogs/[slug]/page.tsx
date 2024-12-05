import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons'
import { formatDate, parseMDX } from '@/lib/utils'
import { Badge, badgeVariants } from '@/components/ui/badge'
import MDXContent from '@/components/mdx-content'
import { UserAvatar } from '@/components/user-avatar'
import { getBlogPostByID, getBlogPostIDBySlug } from '@/lib/blogs'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { BackButton } from '@/components/back-button'

interface Props {
  params: {
    slug: string
  }
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
      <BackButton endpoint='blogs' />

      {post.coverImage && post.coverImage.url ? (
        post.coverImage.url.endsWith('.gif') ? (
          <div className='relative mb-6 w-full overflow-hidden'>
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={700}
              height={400}
              // Ensure GIFs are rendered properly.
              unoptimized={true}
              className='rounded-sm'
            />
          </div>
        ) : (
          <div className='relative mb-6 w-full overflow-hidden'>
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={700}
              height={400}
              className='rounded-sm'
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
                className={badgeVariants({ variant: 'secondary' })}
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
        <div className='flex items-center gap-1 hover:text-foreground'>
          <ArrowUpRightIcon className='size-4' />
          <a
            href='https://dev.to/shricodev'
            target='_blank'
            rel='noreferrer noopener'
          >
            DEV
          </a>
        </div>

        <div className='flex items-center gap-1 hover:text-foreground'>
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
