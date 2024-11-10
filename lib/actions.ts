'use server'

import { ContactFormEmailTemplate } from '@/components/contact-email-template'
import {
  ContactFormSchema,
  TContactFormSchema,
} from '@/lib/validators/contact-form'
import { CreateContactResponse, Resend } from 'resend'
import {
  NewsletterFormSchema,
  TNewsletterFormSchema,
} from '@/lib/validators/newsletter-form'

const resend = new Resend(process.env.RESEND_API_KEY)

type TResonse = {
  error: Error | null
  success: boolean
}

type TSendEmailResponse = TResonse
type TSubscribeNewsletterResponse = TResonse

async function subscribeNewsletterHashnode(
  data: TNewsletterFormSchema,
): Promise<TSubscribeNewsletterResponse> {
  // TODO: Add hashnode newsletter subscription logic here.
  const { email } = data
  console.log(email)
  return { success: true, error: null }
}

async function saveContactsResend(
  data: TNewsletterFormSchema,
): Promise<CreateContactResponse> {
  const { email } = data
  return await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID as string,
  })
}

async function sendEmailResend(data: TContactFormSchema) {
  const senderEmail =
    process.env.RESEND_FROM_EMAIL ?? 'shrijal.acharya@gmail.com'

  const { email, name, message } = data
  return await resend.emails.send({
    from: senderEmail,
    to: email,
    cc: senderEmail,
    subject: 'Portfolio: New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    react: ContactFormEmailTemplate({ name, email, message }),
  })
}

export async function subscribeNewsletter(
  data: TNewsletterFormSchema,
): Promise<TSubscribeNewsletterResponse> {
  const validatedResponse = NewsletterFormSchema.safeParse(data)
  if (!validatedResponse.success) {
    const errorMessage = JSON.stringify(validatedResponse.error.format())
    return { error: new Error(errorMessage), success: false }
  }

  try {
    const { success: hashnodeSuccess, error: hashnodeError } =
      await subscribeNewsletterHashnode(validatedResponse.data)

    if (!hashnodeSuccess || hashnodeError) {
      return { success: false, error: new Error(String(hashnodeError)) }
    }

    const { data: resendData, error: resendError } = await saveContactsResend(
      validatedResponse.data,
    )

    if (!resendData || resendError) {
      return { success: false, error: new Error(String(resendError)) }
    }

    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error(String('Something went wrong!')),
    }
  }
}

export async function sendEmail(
  data: TContactFormSchema,
): Promise<TSendEmailResponse> {
  const validatedResponse = ContactFormSchema.safeParse(data)
  if (!validatedResponse.success) {
    const errorMessage = JSON.stringify(validatedResponse.error.format())
    return { error: new Error(errorMessage), success: false }
  }

  try {
    const { data: resendData, error: resendError } = await sendEmailResend(
      validatedResponse.data,
    )

    if (!resendData || resendError) {
      return { success: false, error: new Error(String(resendError)) }
    }

    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}
