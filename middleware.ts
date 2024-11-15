import { BASE_URL } from '@/lib/constants'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.url
  if (
    url.endsWith('/feed.xml') ||
    url.endsWith('/rss') ||
    url.endsWith('/rss2') ||
    url.endsWith('/rss2.xml') ||
    url.endsWith('/feed')
  ) {
    return NextResponse.redirect(`${BASE_URL}/rss.xml`)
  }

  return NextResponse.next()
}
