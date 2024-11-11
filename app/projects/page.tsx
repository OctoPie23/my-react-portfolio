import { Projects } from '@/components/projects'
import { getProjectsMetadata } from '@/lib/projects'

export default function Page() {
  const projectsMetadata = getProjectsMetadata()

  return (
    <section className='container max-w-3xl'>
      <h1 className='title'>Projects</h1>
      <Projects projectsMetadata={projectsMetadata} />
    </section>
  )
}
