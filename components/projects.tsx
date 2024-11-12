import { TProjectMetadata } from '@/types/projects'
import { ProjectCard } from '@/components/project-card'

interface ProjectsProps {
  projectsMeta: TProjectMetadata[]
}

export const Projects = ({ projectsMeta }: ProjectsProps) => {
  return (
    <>
      {projectsMeta.length === 0 ? (
        <p className='text-sm font-medium text-muted-foreground'>
          No results found
        </p>
      ) : (
        <ul className='flex flex-col gap-8'>
          {projectsMeta.map(projectMeta => (
            <li key={`${projectMeta.title}_${projectMeta.created_at}`}>
              <ProjectCard projectMetadata={projectMeta} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
