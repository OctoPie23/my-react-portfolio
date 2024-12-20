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
import { useRouter } from 'next/navigation'
import {
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants'

interface BlogCardProps {
  blogWithMeta: TBlogCardMetadata
  searchParams?: {
    [SEARCH_QUERY_PARAM]?: string
    [PAGE_QUERY_PARAM]?: string
    [PER_PAGE_QUERY_PARAM]?: string
  }
}

export const BlogCard = ({ blogWithMeta, searchParams }: BlogCardProps) => {
  const router = useRouter()

  const { title, author, tags, brief, slug, readTimeInMinutes, publishedAt } =
    blogWithMeta

  const handleBadgeClick = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    // There is no need to encode the tag, router.push does ist for us.
    params.set(SEARCH_QUERY_PARAM, tag)

    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <Card className='w-full border-none bg-zinc-50 dark:bg-zinc-900'>
      <div className='flex flex-1 flex-col justify-between'>
        <CardHeader>
          <Link
            className='flex flex-col'
            href={{
              pathname: `/blogs/${slug}`,
              ...(searchParams && {
                query: {
                  ...(searchParams.q
                    ? { [SEARCH_QUERY_PARAM]: searchParams.q }
                    : {}),
                  ...(searchParams.page
                    ? { [PAGE_QUERY_PARAM]: searchParams.page }
                    : {}),
                  ...(searchParams.perPage
                    ? { [PER_PAGE_QUERY_PARAM]: searchParams.perPage }
                    : {}),
                },
              }),
            }}
          >
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
                  className='cursor-pointer text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-400'
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
          <Link href='/contact' className='flex items-center'>
            <UserAvatar className='size-7 sm:mr-2' />
            {author ? (
              <span className='hidden text-sm hover:underline hover:underline-offset-2 sm:inline'>
                {author.name}
              </span>
            ) : null}
          </Link>

          <span className='divider mx-1'>•</span>

          <span className='flex items-center gap-1'>
            <BookIcon className='size-4' />
            {`${readTimeInMinutes} min read`}
          </span>

          <span className='divider mx-1'>•</span>

          <span>{formatDate({ date: publishedAt, short: true })}</span>
        </CardFooter>
      </div>
    </Card>
  )
}
