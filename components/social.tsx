import { cn } from '@/lib/utils'
import { SVGProps } from 'react'

export const Social = ({
  href,
  name,
  Icon,
  iconClassName,
}: {
  href: string
  name: string
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>
  iconClassName?: string
}) => {
  return (
    <div className='flex items-center justify-between rounded bg-neutral-50 px-6 py-4 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-900'>
      <a
        target='_blank'
        rel='noreferrer noopener'
        href={href}
        aria-label={`${name} Profile`}
      >
        <Icon className={cn('size-5 md:size-6', iconClassName)} />
      </a>
    </div>
  )
}
