import { Blogs } from '@/components/blogs'
import { AlertIcon } from '@/components/icons'
import { Search } from '@/components/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getBlogPostsWithContent } from '@/lib/blogs'

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const blogsWithContent = getBlogPostsWithContent()

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q : undefined

  const filteredBlogsWithContent = searchQuery
    ? blogsWithContent.filter(blogWithContent =>
        blogWithContent.metadata.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : blogsWithContent

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Blogs</h1>
      <Alert className='mb-4'>
        <AlertIcon className='size-5' />
        <AlertTitle className='text-sm font-semibold uppercase'>
          Heads up!
        </AlertTitle>
        <AlertDescription className='text-sm text-muted-foreground'>
          Check out these posts on{' '}
          <a
            href='https://dev.to/shricodev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
          >
            DEV
          </a>{' '}
          and{' '}
          <a
            href='https://shricodev.hashnode.dev'
            target='_blank'
            rel='noreferrer noopener'
            className='font-semibold text-zinc-400 underline underline-offset-4 hover:text-zinc-500'
          >
            Hashnode
          </a>{' '}
          for full engagement.
        </AlertDescription>
      </Alert>

      <Search
        query={searchQuery}
        endpoint='blogs'
        placeholder='Search blogs...'
      />
      <Blogs blogsWithContent={filteredBlogsWithContent} />
    </section>
  )
}
