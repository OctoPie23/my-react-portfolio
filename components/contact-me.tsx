'use client'

import {
  TContactFormSchema,
  ContactFormSchema,
} from '@/lib/validators/contact-form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { sendEmail } from '@/lib/actions'
import Link from 'next/link'
import { Loader } from '@/components/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export const ContactMe = () => {
  const { toast } = useToast()

  const form = useForm<TContactFormSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const handleFormSubmit: SubmitHandler<TContactFormSchema> = async (
    data: TContactFormSchema,
  ) => {
    const { success, error } = await sendEmail(data)

    if (!success || error) {
      return toast({
        title: 'Something went wrong!',
        variant: 'destructive',
      })
    }

    toast({
      title: 'Success!',
      description: 'Your message has been sent.',
    })

    form.reset()
  }

  return (
    <section className='relative isolate'>
      <div className='relative'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='mt-16 lg:flex-auto'
            noValidate
          >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-500'>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='name'
                          autoFocus
                          placeholder='Name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-500'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input id='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='sm:col-span-2'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-zinc-500'>
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          id='message'
                          placeholder='Enter your message..'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='mt-6'>
              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
                className='w-full disabled:opacity-50'
              >
                {form.formState.isSubmitting ? (
                  <Loader className='mr-2 size-5 animate-spin' />
                ) : null}
                Contact Me
              </Button>
            </div>
            <p className='mt-4 text-xs text-muted-foreground'>
              By submitting this form, I agree to the{' '}
              <Link href='/privacy' className='font-bold' target='_blank'>
                privacy&nbsp;policy.
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
