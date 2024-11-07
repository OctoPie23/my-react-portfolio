import {
  CodingNinjasIcon,
  DevToIcon,
  GeeksForGeeksIcon,
  GitHubIcon,
  HashnodeIcon,
  LeetCodeIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/icons'
import { Social } from '@/components/social'

const socialCategories = [
  {
    name: 'socials',
    items: [
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
    ],
  },
  {
    name: 'coding profiles',
    items: [
      {
        name: 'LeetCode',
        href: 'https://leetcode.com/shricodev',
        icon: LeetCodeIcon,
      },
      {
        name: 'GeeksForGeeks',
        href: 'https://auth.geeksforgeeks.org/user/octopie23',
        icon: GeeksForGeeksIcon,
      },
      {
        name: 'CodingNinjas',
        href: 'https://www.codingninjas.com/codestudio/profile/6d2f4a1b-5461-4e51-92fa-90f00f70f309',
        icon: CodingNinjasIcon,
      },
    ],
  },
]

export const Socials = () => {
  return (
    <div className='my-8 w-full space-y-5'>
      {socialCategories.map((category) => (
        <div key={category.name} className='space-y-2'>
          <h3 className='text-lg font-semibold capitalize text-muted-foreground'>
            {category.name}
          </h3>

          <div className='flex flex-row space-x-2 overflow-x-auto'>
            {category.items.map((social) => (
              <Social
                key={social.name}
                href={social.href}
                name={social.name}
                Icon={social.icon}
                iconClassName='size-5 md:size-6'
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
