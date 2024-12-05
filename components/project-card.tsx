'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TProjectMetadata } from '@/types/projects'
import { Badge } from './ui/badge'
import { formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { GitHubIcon, StarIcon } from '@/components/icons'
import { UserAvatar } from './user-avatar'
import {
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
  STARS_COUNT_TO_SHOW_ICON,
} from '@/lib/constants'
import { InfoTooltip } from '@/components/info-tooltip'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProjectCardProps {
  projectMetadata: TProjectMetadata
}

export const ProjectCard = ({ projectMetadata }: ProjectCardProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    title,
    author,
    clone_url,
    stargazers_count,
    homepage,
    description,
    language,
    created_at,
  } = projectMetadata

  const starsCount = parseInt(stargazers_count.trim(), 10)

  const formattedCreatedDate = formatDate({ date: created_at, short: true })

  const searchQueryParam = searchParams.get('q')
  const pageQueryParam = searchParams.get('page')
  const perPageQueryParam = searchParams.get('perPage')

  const handleBadgeClick = (language: string) => {
    const params = new URLSearchParams(searchParams)
    // There is no need to encode the language, router.push does ist for us.
    params.set('q', language)

    router.push(`/projects?${params.toString()}`)
  }

  return (
    <Card className='w-full border-none bg-zinc-50 dark:bg-zinc-900'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between text-lg font-semibold'>
          <div className='flex items-center gap-2'>
            <Link
              href={{
                pathname: `/projects/${title}`,
                query: {
                  ...(searchQueryParam
                    ? { [SEARCH_QUERY_PARAM]: searchQueryParam }
                    : {}),
                  ...(pageQueryParam
                    ? { [PAGE_QUERY_PARAM]: pageQueryParam }
                    : {}),
                  ...(perPageQueryParam
                    ? { [PER_PAGE_QUERY_PARAM]: perPageQueryParam }
                    : {}),
                },
              }}
              className='hover:underline hover:underline-offset-4'
            >
              {title}
            </Link>

            {starsCount > STARS_COUNT_TO_SHOW_ICON ? (
              <InfoTooltip
                side='top'
                label='Loved by the community'
                className='text-xs'
              >
                {/* As this is a client component, the tooltip required the children to accept the ref property*/}
                {/* So we have to wrap it inside a html tag. */}
                <span>
                  <StarIcon className='size-5 shrink-0 text-orange-300' />
                </span>
              </InfoTooltip>
            ) : null}
          </div>

          <span className='divider hidden text-sm font-light sm:inline'>
            {formattedCreatedDate}
          </span>
        </CardTitle>
        <CardDescription className='flex text-sm text-zinc-700 dark:text-zinc-400'>
          <div className='mt-3 flex items-center'>
            <Link href='/contact-me' className='flex items-center'>
              <UserAvatar className='mr-2 size-8' />
              {author ? (
                <span className='hidden font-semibold hover:underline hover:underline-offset-2 sm:inline'>
                  {author}
                </span>
              ) : null}
            </Link>

            <div className='flex items-center text-sm'>
              {language ? (
                <>
                  <span className='divider mr-1 sm:mx-1'>•</span>
                  <Badge
                    variant='secondary'
                    className='ml-1 cursor-pointer text-muted-foreground hover:text-zinc-600 dark:hover:text-zinc-400'
                    onClick={() => handleBadgeClick(language)}
                  >
                    {language}
                  </Badge>
                </>
              ) : null}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      {description ? (
        <Link href={`/projects/${title}`}>
          <CardContent className='prose max-w-full text-zinc-700 dark:text-zinc-400'>
            {description}
          </CardContent>
        </Link>
      ) : null}
      <CardFooter className='flex justify-between'>
        <a
          href={clone_url}
          target='_blank'
          rel='noreferrer noopener'
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          <GitHubIcon className='size-5' />
          <span className='ml-1 hidden sm:inline'>GitHub</span>
        </a>

        {homepage ? (
          <a
            href={homepage}
            target='_blank'
            rel='noreferrer noopener'
            className={buttonVariants({
              variant: 'default',
            })}
          >
            Live Demo
          </a>
        ) : null}
      </CardFooter>
    </Card>
  )
}
