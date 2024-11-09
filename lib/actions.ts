'use server'

import { ContactFormEmailTemplate } from '@/components/contact-email-template'
import {
  ContactFormSchema,
  TContactFormSchema,
} from '@/lib/validators/contact-form'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailResponse {
  error: Error | null
  success: boolean
}

export async function sendEmail(
  data: TContactFormSchema,
): Promise<SendEmailResponse> {
  const validatedResponse = ContactFormSchema.safeParse(data)
  if (!validatedResponse.success) {
    const errorMessage = JSON.stringify(validatedResponse.error.format())
    return { error: new Error(errorMessage), success: false }
  }

  try {
    const senderEmail =
      process.env.RESEND_FROM_EMAIL ?? 'shrijal.acharya@gmail.com'
    const { name, email, message } = validatedResponse.data
    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: email,
      cc: senderEmail,
      subject: 'Portfolio: Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmailTemplate({ name, email, message }),
    })

    if (!data || error) return { success: false, error }
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}
