'use client'

import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Textarea } from '@/components/reusable/form/textarea'

export default function LLMSettings() {
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
          hint='Controls randomness; higher values make output more creative'
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
          hint='Reduces repetition by penalizing frequent tokens'
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
          hint='Limits the length of the output by setting a maximum number of tokens'
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
          hint='Encourages diversity by boosting the selection of less common tokens'
        />
      </div>
      <Textarea name='description' label='Description' placeholder='Enter Description here...' />
    </SingleAccordion>
  )
}
