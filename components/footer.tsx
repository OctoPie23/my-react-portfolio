import {
  GitHubIcon,
  TwitterIcon,
  DevToIcon,
  HashnodeIcon,
  LinkedInIcon,
} from '@/components/icons'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iamshrijal',
    icon: LinkedInIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/shricodev',
    icon: GitHubIcon,
  },
  {
    name: 'DEV.to',
    href: 'https://dev.to/shricodev',
    icon: DevToIcon,
  },
  {
    name: 'Hashnode',
    href: 'https://hashnode.com/@shricodev',
    icon: HashnodeIcon,
  },
  {
    name: 'X',
    href: 'https://x.com/shricodev',
    icon: TwitterIcon,
  },
]

export const Footer = () => {
  return (
    <footer className='container max-w-2xl py-8'>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex justify-center space-x-6 md:order-2'>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target='_blank'
              rel='noreferrer noopener'
              className='text-muted-foreground hover:text-foreground'
            >
              <span className='sr-only'>{social.name}</span>
              <social.icon className='size-5' />
            </a>
          ))}
        </div>
        <div className='mt-8 md:order-1 md:mt-0'>
          <p className='text-center text-xs leading-5 text-muted-foreground'>
            &copy; {new Date().getFullYear()} shricodev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
