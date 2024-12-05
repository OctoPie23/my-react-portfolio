import Image from 'next/image'
import { highlight } from 'sugar-high'
import { JSX } from 'react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLink({ projectName, ...props }: any) {
  const href = String(props?.href)
  if (href.startsWith('#')) {
    return (
      <a
        {...props}
        target='_blank'
        href={`https://github.com/shricodev/${projectName}/${href}`}
        className='underline underline-offset-4'
      />
    )
  }
  return (
    <a
      {...props}
      target='_blank'
      rel='noopener noreferrer'
      className='underline underline-offset-4'
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomImage({ ...props }: any) {
  const imageSrc = String(props?.src)

  // If the image src is invalid i.e. starts with .
  // Next Image consideres any image path invlid if it starts with .
  // Relative paths need to start with / or http(s):
  if (imageSrc.startsWith('.'))
    // Cannot return a block level element like div or p inside as it would result in a hydration error.
    return (
      <span className='my-2 flex justify-center bg-zinc-50 p-10 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'>
        <strong>404</strong>: Oops, image not found!
      </span>
    )

  // Don't render badges.
  if (imageSrc.includes('img.shields.io')) return null
  return (
    <Image
      width={700}
      height={400}
      alt={props.alt ?? 'Image from MDX'}
      className='mx-auto rounded-md'
      {...props}
    />
  )
}

const components = {
  code: Code,
  img: CustomImage,
  a: CustomLink,
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps & { projectName?: string },
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
