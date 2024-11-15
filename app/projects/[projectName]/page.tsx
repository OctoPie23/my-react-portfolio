import { AlertIcon, ArrowLeftIcon, StarIcon } from '@/components/icons'
import { InfoTooltip } from '@/components/info-tooltip'
import MDXContent from '@/components/mdx-content'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
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
    <section className='container max-w-3xl pb-10'>
      <Link
        href='/projects'
        className={buttonVariants({
          variant: 'secondary',
          className: 'flex gap-2',
        })}
      >
        <ArrowLeftIcon className='size-5' />
        Back to projects
      </Link>

      <header>
        <Alert className='my-8'>
          <AlertIcon className='size-5' />
          <AlertTitle className='text-sm font-semibold uppercase'>
            Heads up!
          </AlertTitle>
          <AlertDescription className='text-sm text-muted-foreground'>
            The <span className='font-bold'>README</span> content here can be
            outdated. To read the latest version, visit my{' '}
            <a
              href='https://github.com/shricodev'
              target='_blank'
              rel='noreferrer noopener'
              className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
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
          {starsCount > STARS_COUNT_TO_SHOW_ICON ? (
            <InfoTooltip
              side='top'
              label='Loved by the community'
              className='text-sm'
            >
              <StarIcon className='size-8 shrink-0 text-orange-300' />
            </InfoTooltip>
          ) : null}
        </h1>
        <div className='mt-3 flex items-center'>
          <Link href='/contact-me' className='flex items-center'>
            <UserAvatar className='mr-0 size-8 sm:mr-2' />
            {author ? (
              <span className='hidden text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2 sm:inline'>
                {author}
              </span>
            ) : null}
          </Link>
          <span className='mx-1 text-muted-foreground'>•</span>
          <span>
            <a
              href={clone_url}
              target='_blank'
              rel='noreferrer noopener'
              className='flex flex-row items-center gap-1 text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2'
            >
              View on GitHub
            </a>
          </span>
          <span className='mx-1 text-muted-foreground'>•</span>
          {projectCreatedDate ? (
            <span className='text-sm text-muted-foreground'>
              {projectCreatedDate}
            </span>
          ) : null}
        </div>
        {topics &&
        Array.isArray(topics) &&
        topics.filter(topic => topic !== PROJECT_FILTER_TOPIC).length > 0 ? (
          <div className='mt-4 flex flex-row flex-wrap gap-2'>
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
        ) : null}
      </header>

      <main className='prose mt-12 max-w-3xl px-4 dark:prose-invert'>
        <MDXContent source={content} />
      </main>
    </section>
  )
}
