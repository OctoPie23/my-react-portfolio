export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://techwithshrijal.com'

export const PUBLIC_GMAIL = 'shrijal.acharya@gmail.com'

export const PER_PAGE_MAX = 100
export const PAGE_MAX = 500

export const SEARCH_QUERY_PARAM = 'q'
export const PAGE_QUERY_PARAM = 'page'
export const PER_PAGE_QUERY_PARAM = 'perPage'

export const PROJECTS_PER_PAGE_DEFAULT = 10
export const BLOGS_PER_PAGE_DEFAULT = 5
export const RECENT_BLOGS_DEFAULT = 3
export const RECENT_PROJECTS_DEFAULT = 4
export const PAGE_INDEX_DEFAULT = 1
export const WORDS_PER_MINUTE_DEFAULT = 250
export const STARS_COUNT_TO_SHOW_ICON = 7
export const DEFAULT_THEME = 'dark'

export const DEBOUNCE_TIME_DEFAULT = 250
export const DEBOUNCE_TIME_PROJECTS = 250
export const DEBOUNCE_TIME_BLOGS = 300

export const HASHNODE_USERNAME = 'shricodev'
export const HASHNODE_BLOGS_FETCH_LIMIT = 15

export const PROJECT_FILTER_TOPIC = 'showcase'

export const ROUTES = [
  '',
  '/blogs',
  '/projects',
  '/work',
  '/contact-me',
  '/privacy',
  '/meet',
]

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Projects', path: '/projects' },
  { name: 'Work', path: '/work' },
  { name: 'Contact me', path: '/contact-me' },
]
