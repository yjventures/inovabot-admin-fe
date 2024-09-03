import FormWrapper from '@/components/reusable/form/form-wrapper'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Textarea } from '@/components/reusable/form/textarea'
import React from 'react'

export default function EmbeddedWidgets() {
  return (
    <FormWrapper>
      <SingleAccordion value='widget' label='Embeddable Widget'>
        <Textarea
          name='calendly_widget'
          label='Embed Calendly Widget'
          placeholder='Enter Calendly Widget Here ...'
          className='bg-black text-white'
          rows={5}
        />
        <Textarea
          name='custom_widget'
          label='Embed Custom Widget'
          placeholder='Enter Custom Widget Here ...'
          className='bg-black text-white'
          rows={5}
        />
        <Textarea
          name='fullpoge_widget'
          label='Embed Full Page Widget'
          placeholder='Enter Full Page Widget Here ...'
          className='bg-black text-white'
          rows={5}
        />
      </SingleAccordion>
    </FormWrapper>
  )
}
