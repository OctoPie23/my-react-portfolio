'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { TBlogCardMetadata } from '@/types/blogs'
import { UserAvatar } from '@/components/user-avatar'
import { Badge } from '@/components/ui/badge'
import { BookIcon } from '@/components/icons'
import { useRouter, useSearchParams } from 'next/navigation'

interface BlogCardProps {
  blogWithMeta: TBlogCardMetadata
}

export const BlogCard = ({ blogWithMeta }: BlogCardProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { title, author, tags, brief, slug, readTimeInMinutes, publishedAt } =
    blogWithMeta

  const handleBadgeClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    // There is no need to encode the tag, router.push does ist for us.
    params.set('q', tag)

    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <Card className='w-full max-w-3xl border-none bg-zinc-50 dark:bg-zinc-900'>
      <div className='flex flex-1 flex-col justify-between'>
        <CardHeader>
          <Link className='flex flex-col' href={`/blogs/${slug}`}>
            <CardTitle className='text-lg font-semibold hover:underline hover:underline-offset-4'>
              {title}
            </CardTitle>
          </Link>
          {tags && tags.length > 0 ? (
            <div className='flex flex-wrap gap-2 py-2'>
              {tags.map(tag => (
                <Badge
                  key={tag.name}
                  variant='secondary'
                  className='cursor-pointer text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400'
                  onClick={() => handleBadgeClick(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardHeader>

        <Link className='flex flex-col' href={`/blogs/${slug}`}>
          <CardContent className='prose max-w-full text-zinc-700 dark:text-zinc-400'>
            {brief}
          </CardContent>
        </Link>

        <CardFooter className='text-sm text-muted-foreground'>
          <Link href='/contact-me' className='flex items-center'>
            <UserAvatar className='size-7 sm:mr-2' />
            {author ? (
              <span className='hidden text-sm hover:underline hover:underline-offset-2 sm:inline'>
                {author.name}
              </span>
            ) : null}
          </Link>

          <span className='mx-1'>•</span>

          <span className='flex items-center gap-1'>
            <BookIcon className='size-4' />
            {`${readTimeInMinutes} min read`}
          </span>

          <span className='mx-1 text-muted-foreground'>•</span>

          <span>{formatDate({ date: publishedAt, short: true })}</span>
        </CardFooter>
      </div>
    </Card>
  )
}
