import { ArrowLeftIcon, StarIcon } from '@/components/icons'
import { InfoTooltip } from '@/components/info-tooltip'
import MDXContent from '@/components/mdx-content'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { PROJECT_FILTER_TOPIC, STARS_COUNT_TO_SHOW_ICON } from '@/lib/constants'
import { getProjectByTitle, getProjectsMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
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

export default function Page({ params: { projectName } }: Props) {
  const project = getProjectByTitle({ title: projectName })
  if (!project) notFound()

  const { metadata, content } = project

  const { title, author, clone_url, topics, created_at, stargazers_count } =
    metadata

  const projectCreatedDate = formatDate({ date: created_at, short: true })

  const starsCount = parseInt(stargazers_count.trim(), 10) ?? 0

  return (
    <section className='pb-24'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className={buttonVariants({
            variant: 'secondary',
            className: 'mb-8 flex gap-2',
          })}
        >
          <ArrowLeftIcon className='size-5' />
          Back to projects
        </Link>

        <header>
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
      </div>
    </section>
  )
}
