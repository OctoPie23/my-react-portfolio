'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FilterFormSchema,
  TFilterFormSchema,
} from '@/lib/validators/filter-form'
import {
  PAGE_INDEX_DEFAULT,
  PAGE_MAX,
  PAGE_QUERY_PARAM,
  PER_PAGE_MAX,
  PER_PAGE_QUERY_PARAM,
} from '@/lib/constants'
import { useState } from 'react'
import { FilterIcon } from '@/components/icons'

interface FilterDropdownProps {
  endpoint: 'blogs' | 'projects'
  defaultPerPage: number
}

export const FilterDropdown = ({
  endpoint,
  defaultPerPage,
}: FilterDropdownProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const perPageSearchParamRaw = searchParams.get(PER_PAGE_QUERY_PARAM)
  const pageSearchParamRaw = searchParams.get(PAGE_QUERY_PARAM)

  const perPageSearchParam = perPageSearchParamRaw ?? defaultPerPage.toString()
  const pageSearchParam = pageSearchParamRaw ?? PAGE_INDEX_DEFAULT.toString()

  const isFiltersApplied =
    (perPageSearchParam && perPageSearchParam !== defaultPerPage.toString()) ||
    (pageSearchParam && pageSearchParam !== PAGE_INDEX_DEFAULT.toString())

  const form = useForm<TFilterFormSchema>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      perPage: `${defaultPerPage}`,
      page: '',
    },
  })

  const isFormDisabled =
    !form.formState.isValid ||
    (!form.getValues(PER_PAGE_QUERY_PARAM) && !form.getValues(PAGE_QUERY_PARAM))

  const handleFormSubmit: SubmitHandler<TFilterFormSchema> = async (
    data: TFilterFormSchema,
  ) => {
    const { perPage, page } = data

    const newSearchParams = new URLSearchParams(searchParams)
    if (perPage) newSearchParams.set(PER_PAGE_QUERY_PARAM, perPage)
    if (page) newSearchParams.set(PAGE_QUERY_PARAM, page)
    setIsOpen(false)
    router.push(`/${endpoint}?${newSearchParams.toString()}`)
  }

  return (
    <div className='flex gap-2'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          asChild
          onClick={() => setIsOpen(prev => !prev)}
          className='mb-4'
        >
          <Button
            variant='outline'
            className='flex items-center gap-1 text-zinc-700 dark:text-zinc-400'
          >
            Filter
            <FilterIcon className='size-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-64 p-4'
          onFocusOutside={() => setIsOpen(false)}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='space-y-2'
            >
              <FormField
                control={form.control}
                name={PER_PAGE_QUERY_PARAM}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-zinc-700 dark:text-zinc-400'>
                      Per Page
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        max={PER_PAGE_MAX}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-rose-500' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={PAGE_QUERY_PARAM}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-zinc-700 dark:text-zinc-400'>
                      Page
                    </FormLabel>
                    <FormControl>
                      <Input type='number' min={1} max={PAGE_MAX} {...field} />
                    </FormControl>
                    <FormMessage className='text-rose-500' />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full disabled:opacity-50'
                disabled={isFormDisabled}
              >
                Apply
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>

      {isFiltersApplied && (
        <Button
          variant='outline'
          className='text-zinc-700 dark:text-zinc-400'
          onClick={() => router.push(`/${endpoint}`)}
        >
          Reset Filters
        </Button>
      )}
    </div>
  )
}
