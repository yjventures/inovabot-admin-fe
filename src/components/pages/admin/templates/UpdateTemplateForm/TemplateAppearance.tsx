'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  category: string | undefined
  setcategory: Dispatch<SetStateAction<string | undefined>>
}

export default function TemplateAppearance({ category, setcategory }: Props) {
  const { watch, setValue } = useFormContext()
  const { data: categoriesListData } = useGetCategoriesQuery({})
  const [catOpen, setcatOpen] = useState<boolean>(false)

  const logoVal = watch('logo_light')
  const darkLogoVal = watch('logo_dark')
  return (
    <div>
      <SingleAccordion value='template-appearance' label='General'>
        <Input name='name' label='Template Name' placeholder='Template name here...' required />

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

        <Label className='mt-4 mb-2 inline-block text-lg'>Logo</Label>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4'>
          {logoVal ? (
            <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo_light', '')} aspect='square' />
          ) : (
            <DnDUpload name='logo_light' text='Light Mode Logo' description='(300 x 300)' />
          )}

          {darkLogoVal ? (
            <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} aspect='square' />
          ) : (
            <DnDUpload name='logo_dark' text='Dark Mode Logo' description='(300 x 300)' />
          )}
        </div>
      </SingleAccordion>
    </div>
  )
}
