import { Projects } from '@/components/projects'
import { Search } from '@/components/search'
import { getProjectsMetadata } from '@/lib/projects'

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const projectsMeta = getProjectsMetadata()

  const searchQuery =
    typeof searchParams?.q === 'string' ? searchParams?.q : undefined

  const filteredProjectsMeta = searchQuery
    ? projectsMeta.filter(
        projectMeta =>
          projectMeta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          projectMeta.language
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : projectsMeta

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Projects</h1>

      <Search
        query={searchQuery}
        endpoint='projects'
        placeholder='Search projects by name or language...'
      />
      <Projects projectsMeta={filteredProjectsMeta} />
    </section>
  )
}
