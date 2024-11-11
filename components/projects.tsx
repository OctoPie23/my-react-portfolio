import { TProjectMetadata } from '@/types/projects'
import { ProjectCard } from './project-card'

interface ProjectsProps {
  projectsMetadata: TProjectMetadata[]
}

export const Projects = ({ projectsMetadata }: ProjectsProps) => {
  return (
    <ul className='flex flex-col gap-8'>
      {projectsMetadata.map(projectMetadata => (
        <li key={`${projectMetadata.title}_${projectMetadata.created_at}`}>
          <ProjectCard projectMetadata={projectMetadata} />
        </li>
      ))}
    </ul>
  )
}
