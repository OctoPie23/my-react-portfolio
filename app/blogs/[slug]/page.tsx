import { getBlogPostsBySlug, getBlogPosts } from '@/lib/blogs'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeftIcon } from '@/components/icons'
import { formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge, badgeVariants } from '@/components/ui/badge'

interface Params {
  params: {
    slug: string
  }
}

// Static Site Generation (SSG) to improve performance on static contents.
export async function generateStaticParams() {
  const blogPosts = await getBlogPosts()
  const blogPostsSlugs = blogPosts.map((post) => ({ slug: post.slug }))

  return blogPostsSlugs
}

export default async function Page({ params: { slug } }: Params) {
  const post = await getBlogPostsBySlug(slug)
  if (!post) notFound()

  const { metadata, content } = post
  const { title, cover, tags } = metadata

  const postDate = formatDate(metadata.datePublished)

  return (
    <section className='pb-24'>
      <div className='container max-w-2xl'>
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
          <p className='mt-3 text-sm text-muted-foreground'>
            Shrijal Acharya
            {postDate ? <> • {postDate}</> : null}
          </p>
          {tags && (
            <div className='mt-4 flex flex-row flex-wrap gap-2'>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <main className='prose dark:prose-invert mt-16'>
          <MDXRemote source={content} />
        </main>
      </div>
    </section>
  )
}
