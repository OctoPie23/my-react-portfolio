import { TBlogPost } from '@/types/blogs'
import { minRead, wordsCount } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { WORDS_PER_MINUTE_DEFAULT } from '@/lib/constants'

interface BlogCardProps {
  blogWithContent: TBlogPost
}

export const BlogCard = ({ blogWithContent }: BlogCardProps) => {
  const {
    metadata: { title, author, cover, datePublished, slug },
    content,
  } = blogWithContent

  const blogWordsCount = wordsCount({ text: content })
  const readingTime = minRead({
    wordCount: blogWordsCount,
    wordsPerMinute: WORDS_PER_MINUTE_DEFAULT,
  })

  return (
    <Link href={`/blogs/${slug}`} className='block'>
      <Card className='flex max-w-3xl flex-row gap-5 border-none p-4 shadow-sm'>
        {cover ? (
          <Image
            src={cover}
            alt={title}
            width={135}
            height={80}
            className='hidden rounded object-cover sm:block'
          />
        ) : (
          <div className='h-[80px] w-[135px] rounded bg-zinc-200 dark:bg-zinc-800' />
        )}

        <div className='flex flex-1 flex-col justify-between'>
          <CardHeader className='mb-2 p-0'>
            <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
          </CardHeader>

          <CardContent className='p-0 text-sm text-muted-foreground'>
            <span>{author ? `${author} • ` : null}</span>
            <span>{`${blogWordsCount} words • `}</span>
            <span>{`${readingTime} min read`}</span>
          </CardContent>

          <CardFooter className='mt-2 p-0 text-xs font-light text-zinc-400'>
            {datePublished
              ? formatDate({ date: datePublished, short: true })
              : null}
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
