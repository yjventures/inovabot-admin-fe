'use client'

import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Slider } from '@/components/reusable/form/slider'
import { Textarea } from '@/components/reusable/form/textarea'

export default function UpdateLLMSettings() {
  return (
    <SingleAccordion value='llm-settings' label='LLM Settings'>
      <Input name='first_message' label='First Message' placeholder='First Message here...' />
      <div className='flex items-center flex-col min-[450px]:flex-row gap-x-2 w-full'>
        <Slider
          name='temperature'
          label='Temperature'
          containerClassName='w-full'
          min={0}
          max={2}
          step={0.1}
          hint='Controls randomness; higher values make output more creative'
        />
        <Slider
          name='frequency_penalty'
          label='Frequency Penalty'
          containerClassName='w-full'
          min={-2}
          max={2}
          step={0.1}
          hint='Reduces repetition by penalizing frequent tokens'
        />
      </div>
      <div className='flex items-center flex-col min-[450px]:flex-row gap-x-2'>
        <Slider
          name='top_p'
          label='Top Presence'
          containerClassName='w-full'
          min={0}
          max={1}
          step={0.1}
          hint='Encourages diversity by boosting the selection of less common tokens'
        />
        <Input
          name='max_token'
          label='Max Tokens'
          placeholder='Max Tokens here...'
          containerClassName='w-full'
          type='number'
          hookFormConfig={{ valueAsNumber: true }}
          hint='Limits the length of the output by setting a maximum number of tokens'
        />
      </div>
      <Textarea name='description' label='Description' placeholder='Enter Description here...' />
    </SingleAccordion>
  )
}
