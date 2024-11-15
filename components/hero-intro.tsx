import Image from 'next/image'
import { Card } from '@/components/ui/card'

export const HeroIntro = () => {
  return (
    <>
      <section className='flex flex-col items-center gap-y-4 md:flex-row md:items-center md:gap-x-10'>
        <div className='flex-1'>
          <h1 className='title mb-8 no-underline'>Hey, I&#39;m Shrijal 👋</h1>
          <p className='prose my-2 font-medium text-zinc-800 dark:text-zinc-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            quam voluptas dolores autem consectetur voluptatem cum quia vero
            voluptatibus iste odit necessitatibus quaerat beatae enim tempora.
            Deleniti iste sequi adipisci.
          </p>
        </div>
        <Image
          className='hidden rounded-full md:block'
          src='/images/shrijal-acharya.jpg'
          alt='Shrijal Acharya'
          width={175}
          height={175}
          priority
        />
      </section>

      <Card className='my-6 p-4 shadow-none md:flex md:items-center'>
        <div className='flex items-center md:flex-shrink-0'>
          <Image
            src='/images/shrijal-acharya.jpg'
            alt='Shrijal Acharya'
            width={120}
            height={120}
            className='rounded-full'
          />
          <div className='ml-4'>
            <ul className='mt-2 space-y-1 font-light text-muted-foreground'>
              <li>1000+ blog posts</li>
              <li>10,000+ tweets all time</li>
            </ul>
          </div>
        </div>
      </Card>

      <p className='prose mt-3 max-w-full font-medium text-zinc-800 dark:text-zinc-300'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione quo
        ducimus asperiores eveniet consectetur velit mollitia unde minus
        molestias, quisquam cupiditate, doloribus animi itaque corrupti maxime
        dolorum non soluta nam.
      </p>
    </>
  )
}
