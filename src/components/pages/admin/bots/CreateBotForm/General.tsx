'use client'

import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { useGetComanyListQuery } from '@/redux/features/companiesApi'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  category: string | undefined
  setcategory: Dispatch<SetStateAction<string | undefined>>
  company_id: string
  setcompany_id: Dispatch<SetStateAction<string>>
}

export default function General({ category, setcategory, company_id, setcompany_id }: Props) {
  const { data: companyListData } = useGetComanyListQuery({})
  const { data: categoriesListData } = useGetCategoriesQuery({})
  const [open, setOpen] = useState<boolean>(false)
  const [catOpen, setcatOpen] = useState<boolean>(false)

  return (
    <SingleAccordion value='general' label='General'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2'>
        <div>
          <p className='text-sm font-medium mb-1.5 text-text-secondary'>Company*</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className='truncate'>
              <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
                {company_id ? companyListData?.data.find(com => com._id === company_id)?.name : 'Select Company...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
              <Command>
                <CommandInput placeholder='Search Company...' />
                <CommandList>
                  <CommandEmpty>No company found.</CommandEmpty>
                  <CommandGroup>
                    {companyListData?.data?.map(com => (
                      <CommandItem
                        key={com?._id}
                        value={com?.name}
                        onSelect={() => {
                          setcompany_id(com._id)
                          setOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', company_id === com?._id ? 'opacity-100' : 'opacity-0')} />
                        {com?.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <p className='text-sm font-medium mb-1.5 text-text-secondary'>Category*</p>
          <Popover open={catOpen} onOpenChange={setcatOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' aria-expanded={catOpen} className='w-full justify-between'>
                {category || 'Select Category...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
              <Command>
                <CommandInput placeholder='Search Compnay...' />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categoriesListData?.categories?.map(cat => (
                      <CommandItem
                        key={cat?._id}
                        value={cat?.title}
                        onSelect={() => {
                          setcategory(cat?.title)
                          setcatOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', category === cat?.title ? 'opacity-100' : 'opacity-0')} />
                        {cat?.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </SingleAccordion>
  )
}
