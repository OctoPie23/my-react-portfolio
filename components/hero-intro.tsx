import Image from 'next/image'
import {
  Card,
  //CardHeader,
  //CardTitle,
  //CardDescription,
  //CardContent,
  //CardFooter,
} from '@/components/ui/card'

export const HeroIntro = () => {
  return (
    <>
      <section className='flex flex-col items-center gap-y-4 md:flex-row md:items-center md:gap-x-10'>
        <div className='flex-1'>
          <h1 className='title mb-8 no-underline'>Hey, I&#39;m Shrijal 👋</h1>
          <p className='mt-3 font-light text-muted-foreground'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            quam voluptas dolores autem consectetur voluptatem cum quia vero
            voluptatibus iste odit necessitatibus quaerat beatae enim tempora.
            Deleniti iste sequi adipisci.
          </p>
        </div>
        <Image
          className='hidden rounded-full md:block'
          src={'/images/shricodev.jpg'}
          alt='Shrijal Acharya'
          width={175}
          height={175}
          priority
        />
      </section>

      <Card className='mt-6 p-4 md:flex md:items-center'>
        <div className='md:hidden md:flex-shrink-0'>
          <Image
            src={'/images/shricodev.jpg'}
            alt='Shrijal Acharya'
            width={175}
            height={175}
            className='rounded-full'
          />
        </div>

        <div className='hidden md:flex md:w-1/3 md:items-center'>
          <p className='text-lg font-medium'>Additional Information</p>
        </div>
      </Card>
    </>
  )
}
