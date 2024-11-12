'use client'

import { useToast } from '@/hooks/use-toast'
import {
  NewsletterFormSchema,
  TNewsletterFormSchema,
} from '@/lib/validators/newsletter-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/icons'

export const NewsletterForm = () => {
  const { toast } = useToast()

  const form = useForm<TNewsletterFormSchema>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleFormSubmit: SubmitHandler<TNewsletterFormSchema> = async (
    data: TNewsletterFormSchema,
  ) => {
    const { email } = data
    //const { success, error } = await subscribeNewsletter({ email })
    console.log(email)
    toast({
      title: 'Subscribed!',
      description: 'You are now subscribed to the newsletter.',
    })
  }

  return (
    <section className='mb-10 mt-24'>
      <Card className='rounded-lg border-0 dark:border'>
        <CardContent className='flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8'>
          <div>
            <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
            <p className='text-muted-foreground'>
              Get updates on my projects and blogs
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='flex flex-col items-start gap-3'
              noValidate
            >
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-500'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          id='email'
                          autoComplete='email'
                          placeholder='Enter your email...'
                          className='w-full'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-rose-500' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full'>
                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  className='w-full disabled:opacity-50'
                >
                  {form.formState.isSubmitting ? (
                    <Loader className='mr-2 size-5 animate-spin' />
                  ) : null}
                  Subscribe
                </Button>
              </div>

              <p className='text-xs text-muted-foreground'>
                We care about your data. Read our{' '}
                <Link href='/privacy' className='font-bold' target='_blank'>
                  privacy&nbsp;policy.
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
