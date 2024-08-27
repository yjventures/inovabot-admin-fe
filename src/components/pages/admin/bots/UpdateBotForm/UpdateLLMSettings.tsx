'use client'

import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Textarea } from '@/components/reusable/form/textarea'
import React from 'react'

export default function UpdateLLMSettings() {
  return (
    <SingleAccordion value='llm-settings' label='LLM Settings'>
      <Input name='first_message' label='First Message' placeholder='First Message here...' />
      <div className='flex items-center gap-x-2 w-full'>
        <Input
          name='temperature'
          label='Temperature'
          placeholder='Temperature here...'
          containerClassName='w-full'
          type='number'
          min={0}
          max={2}
          step={0.1}
          hookFormConfig={{ valueAsNumber: true }}
        />
        <Input
          name='frequently_penalty'
          label='Frequently Penalty'
          placeholder='Frequently Penalty here...'
          containerClassName='w-full'
          type='number'
          min={-2}
          max={2}
          step={0.1}
          hookFormConfig={{ valueAsNumber: true }}
        />
      </div>
      <div className='flex items-center gap-x-2'>
        <Input
          name='max_token'
          label='Max Tokens'
          placeholder='Max Tokens here...'
          containerClassName='w-full'
          type='number'
          hookFormConfig={{ valueAsNumber: true }}
        />
        <Input
          name='top_p'
          label='Top Presence'
          placeholder='Top Presence here...'
          containerClassName='w-full'
          type='number'
          min={0}
          max={1}
          step={0.1}
          hookFormConfig={{ valueAsNumber: true }}
        />
      </div>
      <Textarea name='description' label='Description' placeholder='Enter Description here...' />
    </SingleAccordion>
  )
}
