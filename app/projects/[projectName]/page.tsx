import { ArrowLeftIcon } from '@/components/icons'
import MDXContent from '@/components/mdx-content'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
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
  const projectsMetadata = getProjectsMetadata()
  const projectSlugs = projectsMetadata.map(project => ({
    projectName: project.title,
  }))
  return projectSlugs
}

export default function Page({ params: { projectName } }: Props) {
  const project = getProjectByTitle(projectName)
  if (!project) notFound()

  const { metadata, content } = project

  const {
    title,
    author,
    topics,
    clone_url,
    homepage,
    language,
    created_at,
    updated_at,
    description,
  } = metadata

  const projectCreatedDate = formatDate(created_at, true)
  const projectUpdatedDate = formatDate(updated_at, true)

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
          <h1 className='text-3xl font-bold decoration-border/75 decoration-2'>
            {title}
          </h1>

          <div className='mt-3 flex items-center'>
            <Link href='/contact-me' className='flex items-center'>
              <UserAvatar className='mr-2 size-8' />
              {author ? (
                <span className='text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2'>
                  {author}
                </span>
              ) : null}
              <span className='mr-1 sm:mx-1'>•</span>
            </Link>
            {projectCreatedDate ? (
              <span className='text-sm text-muted-foreground'>
                {projectCreatedDate}
              </span>
            ) : null}
          </div>

          {topics && topics.length > 0 ? (
            <div className='mt-4 flex flex-row flex-wrap gap-2'>
              {topics.map(topic => (
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

        <main className='prose mt-16 max-w-3xl px-4 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
