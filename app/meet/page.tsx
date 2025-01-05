import { CalMeet } from '@/components/cal-meet'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meeting',
  description:
    'Let’s set up a time to chat! Schedule a meeting with me, Shrijal Acharya, and we can discuss your ideas or projects.',
}

export default function Page() {
  return (
    <section>
      <h1 className='title'>Schedule a Meet</h1>
      <div className='rounded-lg'>
        <CalMeet />
      </div>
    </section>
  )
}
