'use client'

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

export default function General({ category, setcategory }: Props) {
  const { data: categoriesListData } = useGetCategoriesQuery({})
  const [catOpen, setcatOpen] = useState<boolean>(false)

  return (
    <SingleAccordion value='general' label='General'>
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
                        setcategory(cat.title)
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
    </SingleAccordion>
  )
}
