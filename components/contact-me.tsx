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
import { toast } from 'sonner'

export const ContactMe = () => {
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

    if (!success || error) return toast.error('Something went wrong!')

    toast.success('Message sent successfully!')

    form.reset()
  }

  return (
    <section className='relative'>
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
                        placeholder='Enter your name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-rose-500' />
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
                      <Input
                        id='email'
                        placeholder='Enter your email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-rose-500' />
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
                        placeholder='Enter your message...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-rose-500' />
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
            <Link
              href='/privacy'
              className='font-bold hover:underline hover:underline-offset-2'
              target='_blank'
            >
              privacy&nbsp;policy.
            </Link>
          </p>
        </form>
      </Form>
    </section>
  )
}
