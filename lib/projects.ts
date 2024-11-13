import path from 'path'
import fs from 'fs'
import { TProject, TProjectMetadata } from '@/types/projects'
import matter from 'gray-matter'
import { PAGE_INDEX_DEFAULT, PROJECTS_PER_PAGE_DEFAULT } from './constants'

const projectsDirectory = path.resolve(process.cwd(), 'content', 'projects')

function getMDXFiles({ dir }: { dir: string }): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map(dirent => dirent.name)
}

export function getProjectsLength(): number {
  const projectFiles = getMDXFiles({ dir: projectsDirectory })
  return projectFiles.length
}

export function getProjectByTitle({
  title,
}: {
  title: string
}): TProject | null {
  const projectFilePath = path.join(projectsDirectory, `${title}_README.mdx`)

  try {
    const projectFileContent = fs.readFileSync(projectFilePath, {
      encoding: 'utf-8',
    })

    const { data, content } = matter(projectFileContent)
    return {
      metadata: {
        ...data,
        author: 'Shrijal Acharya',
      },
      content,
    } as TProject
  } catch (error) {
    console.error(`Error reading project file: ${projectFilePath}`, error)
    return null
  }
}

export function getProjectMetadata({
  projectFilePath,
}: {
  projectFilePath: string
}): TProjectMetadata | null {
  const projectAbsFilePath = path.join(projectsDirectory, projectFilePath)

  try {
    const projectFileContent = fs.readFileSync(projectAbsFilePath, 'utf-8')
    const { data } = matter(projectFileContent)

    return {
      ...data,
      author: 'Shrijal Acharya',
    } as TProjectMetadata
  } catch (error) {
    console.error(
      `Error reading metadata for file: ${projectAbsFilePath}`,
      error,
    )
    return null
  }
}

export function getProjectsMetadata({
  page = PAGE_INDEX_DEFAULT,
  perPage = PROJECTS_PER_PAGE_DEFAULT,
  all = false,
}: {
  page?: number
  perPage?: number
  all?: boolean
}): TProjectMetadata[] {
  const projectFiles = getMDXFiles({ dir: projectsDirectory })

  if (all) {
    return projectFiles
      .map(file => getProjectMetadata({ projectFilePath: file }))
      .filter((metadata): metadata is TProjectMetadata => metadata !== null)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
  }

  const start = (page - 1) * perPage

  return projectFiles
    .map(file => getProjectMetadata({ projectFilePath: file }))
    .filter((metadata): metadata is TProjectMetadata => metadata !== null)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(start, start + perPage)
}

export function getProjectsWithContent({
  page = PAGE_INDEX_DEFAULT,
  perPage = PROJECTS_PER_PAGE_DEFAULT,
  all = false,
}: {
  page?: number
  perPage?: number
  all?: boolean
}) {
  const projectFiles = getMDXFiles({ dir: projectsDirectory })

  if (all) {
    return projectFiles
      .map(file => {
        const slug = file.replace(/_README\.mdx$/, '')
        return getProjectByTitle({ title: slug })
      })
      .filter((project): project is TProject => project !== null)
      .sort(
        (a, b) =>
          new Date(b.metadata.created_at ?? '').getTime() -
          new Date(a.metadata.created_at ?? '').getTime(),
      )
  }

  const start = (page - 1) * perPage
  const paginatedFiles = projectFiles.slice(start, start + perPage)

  return paginatedFiles
    .map(file => {
      const slug = file.replace(/_README\.mdx$/, '')
      return getProjectByTitle({ title: slug })
    })
    .filter((project): project is TProject => project !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.created_at ?? '').getTime() -
        new Date(a.metadata.created_at ?? '').getTime(),
    )
}
