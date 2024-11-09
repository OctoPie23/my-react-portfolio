'use client'

import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme='dark'
      attribute='class'
      disableTransitionOnChange
    >
      {children}

      {/* Toaster provider from shadcn/ui */}
      <Toaster />

      {/* Vercel Analytics and Speed Insights */}
      {/* NOTE: Don't edit/remove these components */}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
