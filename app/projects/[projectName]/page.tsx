import { BackButton } from '@/components/back-button'
import { AlertIcon, ArrowUpRightIcon, StarIcon } from '@/components/icons'
import { InfoTooltip } from '@/components/info-tooltip'
import MDXContent from '@/components/mdx-content'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { UserAvatar } from '@/components/user-avatar'
import { PROJECT_FILTER_TOPIC, STARS_COUNT_TO_SHOW_ICON } from '@/lib/constants'
import { getProjectByTitle, getProjectsMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    projectName: string
  }
}

// Static Site Generation (SSG) to improve performance on static contents.
export async function generateStaticParams() {
  const projectsMetadata = getProjectsMetadata({ all: true })
  const projectSlugs = projectsMetadata.map(project => ({
    projectName: project.title,
  }))
  return projectSlugs
}

export function generateMetadata({ params: { projectName } }: Props): Metadata {
  const project = getProjectByTitle({ title: projectName })
  return {
    title: project?.metadata.title,
    description: project?.metadata.description,
    openGraph: {
      title: project?.metadata.title,
      description: project?.metadata.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: project?.metadata.title,
      description: project?.metadata.description,
    },
  }
}

export default function Page({ params: { projectName } }: Props) {
  const project = getProjectByTitle({ title: projectName })
  if (!project) notFound()

  const { metadata, content } = project

  const { title, author, clone_url, topics, created_at, stargazers_count } =
    metadata

  const projectCreatedDate = formatDate({ date: created_at, short: true })

  const starsCount = parseInt(stargazers_count.trim(), 10) ?? 0

  return (
    <section className='pb-10'>
      <BackButton endpoint='projects' />

      <header>
        <Alert className='my-8'>
          <AlertIcon className='size-5' />
          <AlertTitle className='text-sm font-semibold uppercase'>
            Heads up!
          </AlertTitle>
          <AlertDescription className='text-sm text-muted-foreground'>
            The README content here can be outdated. To read the latest version,
            visit my{' '}
            <a
              href='https://github.com/shricodev'
              target='_blank'
              rel='noreferrer noopener'
              className='font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground'
            >
              GitHub
            </a>{' '}
            profile.
          </AlertDescription>
        </Alert>

        <h1 className='flex items-center gap-2 text-3xl font-bold'>
          <a
            href={clone_url}
            target='_blank'
            rel='noreferrer noopener'
            className='hover:underline hover:underline-offset-4'
          >
            {title}
          </a>
          {starsCount > STARS_COUNT_TO_SHOW_ICON && (
            <InfoTooltip
              side='top'
              label='Loved by the community'
              className='text-sm'
            >
              <StarIcon className='size-8 text-orange-300' />
            </InfoTooltip>
          )}
        </h1>

        <div className='mt-3 flex items-center'>
          <Link href='/contact-me' className='flex items-center'>
            <UserAvatar className='size-8 sm:mr-2' />
            {author && (
              <span className='hidden text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2 sm:inline'>
                {author}
              </span>
            )}
          </Link>
          <span className='divider mx-1'>•</span>
          <a
            href={clone_url}
            target='_blank'
            rel='noreferrer noopener'
            className='flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2'
          >
            View on GitHub
          </a>
          <span className='divider mx-1'>•</span>
          {projectCreatedDate && (
            <span className='text-sm text-muted-foreground'>
              {projectCreatedDate}
            </span>
          )}
        </div>

        {topics && topics?.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {topics
              .filter(topic => topic !== PROJECT_FILTER_TOPIC)
              .map(topic => (
                <Badge
                  key={topic}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  {topic}
                </Badge>
              ))}
          </div>
        )}
      </header>

      <main className='prose mt-12 max-w-3xl dark:prose-invert'>
        <MDXContent projectName={projectName} source={content} />
      </main>

      <div className='mt-10 flex items-center gap-1 text-sm font-medium text-muted-foreground'>
        <div className='flex items-center gap-1 hover:text-foreground'>
          <ArrowUpRightIcon className='size-4' />
          <a href={clone_url} target='_blank' rel='noreferrer noopener'>
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
