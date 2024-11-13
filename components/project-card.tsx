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
import { STARS_COUNT_TO_SHOW_ICON } from '@/lib/constants'
import { InfoTooltip } from './info-tooltip'

interface ProjectCardProps {
  projectMetadata: TProjectMetadata
}

export const ProjectCard = ({ projectMetadata }: ProjectCardProps) => {
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

  return (
    <Card className='w-full max-w-3xl'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between text-lg font-semibold'>
          <div className='flex items-center gap-2'>
            <Link
              href={`/projects/${title}`}
              className='hover:underline hover:underline-offset-4'
            >
              {title}
            </Link>

            {starsCount > STARS_COUNT_TO_SHOW_ICON ? (
              <InfoTooltip
                side='top'
                label={`Loved by the community`}
                className='text-xs'
              >
                <StarIcon className='size-5 shrink-0 text-orange-300' />
              </InfoTooltip>
            ) : null}
          </div>

          <span className='hidden text-xs font-light text-muted-foreground sm:inline'>
            {formattedCreatedDate}
          </span>
        </CardTitle>
        <CardDescription className='flex text-sm text-muted-foreground'>
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
                  <span className='mr-1 sm:mx-1'>•</span>
                  <Badge
                    variant='outline'
                    className='ml-1 text-muted-foreground'
                  >
                    {language}
                  </Badge>
                </>
              ) : null}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className='text-muted-foreground'>
        {description ? `${description}` : null}
      </CardContent>
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
