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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GitHubIcon } from '@/components/icons'

interface ProjectCardProps {
  projectMetadata: TProjectMetadata
}

export const ProjectCard = ({ projectMetadata }: ProjectCardProps) => {
  const {
    title,
    author,
    clone_url,
    homepage,
    description,
    language,
    created_at,
  } = projectMetadata

  const formattedCreatedDate = formatDate(created_at, true)

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex justify-between text-lg font-semibold'>
          <Link
            href={`/projects/${title}`}
            className='hover:underline hover:underline-offset-4'
          >
            {title}
          </Link>

          <span className='hidden text-sm font-light text-muted-foreground sm:inline'>
            {formattedCreatedDate}
          </span>
        </CardTitle>
        <CardDescription className='flex text-sm text-muted-foreground'>
          <div className='mt-3 flex items-center'>
            <Link href={'/contact-me'} className='flex items-center'>
              <Avatar className='mr-2 size-8'>
                <AvatarImage
                  src='/images/shricodev.jpg'
                  alt='Shrijal Acharya @shricodev'
                />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              {author && (
                <span className='hidden font-semibold hover:underline hover:underline-offset-2 sm:inline'>
                  {author}
                </span>
              )}
              <span className='mr-1 sm:mx-1'>•</span>
            </Link>

            <div className='flex items-center text-sm'>
              {language ? (
                <>
                  <span className='text-muted-foreground'>Built with:</span>
                  <Badge variant='outline' className='ml-1'>
                    {language}
                  </Badge>
                </>
              ) : null}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>{description ? `${description}` : null}</CardContent>
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
