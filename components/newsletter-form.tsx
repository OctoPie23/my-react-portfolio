'use client'

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
import { subscribeToNewsletter } from '@/lib/blogs'
import { toast } from 'sonner'
import { saveContactsResend } from '@/lib/actions'

export const NewsletterForm = () => {
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

    try {
      await subscribeToNewsletter({ email })

      const { data: resendData, error: resendError } = await saveContactsResend(
        {
          email,
        },
      )

      // We don't want to return success of false even if saving contact failed
      // Because if the email was sent successfully, we don't want to show an error
      // to the user.
      if (!resendData || resendError) {
        console.error('Error saving contact to Resend:', resendError)
      }

      toast.success('Check your email to confirm your subscription!', {
        description: 'Make sure to check your spam folder.',
      })

      form.reset()
    } catch {
      return toast.error('Something went wrong!', {
        description: 'You might already be subscribed.',
      })
    }
  }

  return (
    <section className='mb-10 mt-24'>
      <Card className='rounded-lg border-0 dark:border'>
        <CardContent className='flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8'>
          <div className='flex-grow'>
            <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
            <p className='text-muted-foreground'>
              Get recent projects &amp; blog updates to your inbox.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='flex flex-grow flex-col items-start gap-3'
              noValidate
            >
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-700 dark:text-zinc-400'>
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
                I never share your email. Read our{' '}
                <Link
                  href='/privacy'
                  className='font-bold hover:text-foreground hover:underline hover:underline-offset-2 hover:transition'
                  target='_blank'
                >
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
