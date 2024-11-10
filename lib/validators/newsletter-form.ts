import { z } from 'zod'

export const NewsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('Invalid email.'),
})

export type TNewsletterFormSchema = z.infer<typeof NewsletterFormSchema>
