import { z } from 'zod'

export const FilterFormSchema = z
  .object({
    perPage: z.string().optional(),
    page: z.string().optional(),
  })
  .refine(data => data.perPage || data.page)

export type TFilterFormSchema = z.infer<typeof FilterFormSchema>
