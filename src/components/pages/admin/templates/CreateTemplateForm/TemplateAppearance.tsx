'use client'

import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  category: string | undefined
  setcategory: Dispatch<SetStateAction<string | undefined>>
}

export default function TemplateAppearance({ category, setcategory }: Props) {
  const { data: categoriesListData } = useGetCategoriesQuery({})
  const [catOpen, setcatOpen] = useState<boolean>(false)
  return (
    <div>
      <SingleAccordion value='template-appearance' label='General'>
        <Input name='name' label='Template Name' placeholder='Template name here...' required />

        <div>
          <p className='text-sm font-medium mb-1.5 text-text-secondary'>Category*</p>
          <Popover open={catOpen} onOpenChange={setcatOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' aria-expanded={catOpen} className='w-full justify-between'>
                {category
                  ? categoriesListData?.categories?.find(com => com.title === category)?.title
                  : 'Select Category...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
              <Command>
                <CommandInput placeholder='Search Compnay...' />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categoriesListData?.categories?.map(com => (
                      <CommandItem
                        key={com?._id}
                        value={com?.title}
                        onSelect={currentValue => {
                          setcategory(currentValue === category ? '' : currentValue)
                          setcatOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', category === com?.title ? 'opacity-100' : 'opacity-0')} />
                        {com?.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </SingleAccordion>
    </div>
  )
}
