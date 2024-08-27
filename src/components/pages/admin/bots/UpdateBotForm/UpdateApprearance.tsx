'use client'

import ColorInput from '@/components/reusable/form/color-input'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { slugify } from '@/utils/form/slugify'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function UpdateAppearance() {
  const { watch, setValue } = useFormContext()
  const logoVal = watch('logo_light')
  const darkLogoVal = watch('logo_dark')

  const nameVal = watch('name')
  useEffect(() => {
    if (nameVal) setValue('embedding_url', slugify(nameVal))
    else setValue('embedding_url', '')
  }, [nameVal, setValue])

  return (
    <SingleAccordion value='appearance' label='Appearance'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {logoVal ? (
          <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo_light', '')} />
        ) : (
          <DnDUpload name='logo_light' text='Light Mode Logo' />
        )}

        {darkLogoVal ? (
          <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} />
        ) : (
          <DnDUpload name='logo_dark' text='Dark Mode Logo' />
        )}
      </div>
      <Input name='name' label='Assistant Name' placeholder='Assistant name here...' required />
      <Input name='embedding_url' label='Embedding URL Slug' placeholder='Edit Embedding URL Slug...' required />

      <div className='grid grid-cols-3 gap-x-3'>
        <ColorInput name='primary_color' label='Primary Color' required defaultValue='#9eb0ff' />
        <ColorInput name='secondary_color' label='Secondary Color' required defaultValue='#e1e1f9' />
        <ColorInput name='font_color' label='Font Color' required defaultValue='#000000' />
      </div>
    </SingleAccordion>
  )
}
