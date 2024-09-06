'use client'

import ColorInput from '@/components/reusable/form/color-input'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Label } from '@/components/ui/label'
import { slugify } from '@/utils/form/slugify'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function Appearance() {
  const { watch, setValue } = useFormContext()

  const logoVal = watch('logo_light')
  const darkLogoVal = watch('logo_dark')

  const botLogoVal = watch('bot_logo')
  const userLogoVal = watch('user_logo')

  const bgLightVal = watch('bg_light')
  const bgDarkVal = watch('bg_dark')

  console.log(bgLightVal, bgDarkVal)

  const nameVal = watch('name')
  useEffect(() => {
    if (nameVal) setValue('embedding_url', slugify(nameVal))
    else setValue('embedding_url', '')
  }, [nameVal, setValue])

  return (
    <SingleAccordion value='appearance' label='Appearance'>
      <Input name='name' label='Assistant Name' placeholder='Assistant name here...' required />
      <Input name='embedding_url' label='Embedding URL Slug' placeholder='Edit Embedding URL Slug...' required />

      <Label className='mt-4 mb-2 inline-block text-lg'>Logo and Backgrounds</Label>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {logoVal ? (
          <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo_light', '')} aspect='square' />
        ) : (
          <DnDUpload name='logo_light' text='Light Mode Logo*' required />
        )}

        {darkLogoVal ? (
          <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} aspect='square' />
        ) : (
          <DnDUpload name='logo_dark' text='Dark Mode Logo' />
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {botLogoVal ? (
          <ImagePreviewer imgSrc={botLogoVal} onClick={() => setValue('bot_logo', '')} aspect='square' />
        ) : (
          <DnDUpload name='bot_logo' text='Bot Logo*' required />
        )}

        {userLogoVal ? (
          <ImagePreviewer imgSrc={userLogoVal} onClick={() => setValue('user_logo', '')} aspect='square' />
        ) : (
          <DnDUpload name='user_logo' text='User Logo*' required />
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {bgLightVal ? (
          <ImagePreviewer imgSrc={bgLightVal} onClick={() => setValue('bg_light', '')} />
        ) : (
          <DnDUpload name='bg_light' text='Background Image(Light)' />
        )}

        {bgDarkVal ? (
          <ImagePreviewer imgSrc={bgDarkVal} onClick={() => setValue('bg_dark', '')} />
        ) : (
          <DnDUpload name='bg_dark' text='Background Image(Dark)' />
        )}
      </div>

      <Label className='mt-4 mb-2 inline-block text-lg'>Colors</Label>
      <div className='grid grid-cols-3 gap-x-3'>
        <ColorInput name='primary_color' label='Primary Color' required defaultValue='#9eb0ff' />
        <ColorInput name='secondary_color' label='Secondary Color' required defaultValue='#e1e1f9' />
        <ColorInput name='font_color' label='Font Color' required defaultValue='#000000' />

        <ColorInput name='primary_color_dark' label='Primary Color (Dark)' required defaultValue='#9eb0ff' />
        <ColorInput name='secondary_color_dark' label='Secondary Color (Dark)' required defaultValue='#e1e1f9' />
        <ColorInput name='font_color_dark' label='Font Color (Dark)' required defaultValue='#000000' />
      </div>
    </SingleAccordion>
  )
}
