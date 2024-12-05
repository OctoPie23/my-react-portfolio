import { CalMeet } from '@/components/cal-meet'

export function generateMetadata() {
  return {
    title: 'Meeting',
    description: 'Schedule a meet with Shrijal Acharya',
  }
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
