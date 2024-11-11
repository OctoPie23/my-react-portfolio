import path from 'path'
import fs from 'fs'
import { TProject, TProjectMetadata } from '@/types/projects'
import matter from 'gray-matter'

const projectsDirectory = path.resolve(process.cwd(), 'content', 'projects')

function getMDXFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map(dirent => dirent.name)
}

export function getProjectByTitle(title: string): TProject | null {
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
  } catch {
    return null
  }
}

export function getProjectsMetadata(limit?: number): TProjectMetadata[] {
  const projectFiles = getMDXFiles(projectsDirectory)

  const projectsMetadata = projectFiles
    .map(getProjectMetadata)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

  return limit ? projectsMetadata.slice(0, limit) : projectsMetadata
}

export function getProjectMetadata(projectFilePath: string): TProjectMetadata {
  const projectAbsFilePath = path.join(projectsDirectory, projectFilePath)
  const projectFileContent = fs.readFileSync(projectAbsFilePath, {
    encoding: 'utf-8',
  })

  const { data } = matter(projectFileContent)
  return {
    ...data,
    author: 'Shrijal Acharya',
  } as TProjectMetadata
}

export function getProjectsWithContent(limit?: number) {
  const projectFiles = getMDXFiles(projectsDirectory)

  const allProjects = projectFiles.map(file => {
    const slug = file.replace(/_README\.mdx$/, '')
    return getProjectByTitle(slug)
  }) as TProject[]

  const sortedProjects = allProjects.sort(
    (a, b) =>
      new Date(b.metadata.created_at ?? '').getTime() -
      new Date(a.metadata.created_at ?? '').getTime(),
  )

  return limit ? sortedProjects.slice(0, limit) : sortedProjects
}
