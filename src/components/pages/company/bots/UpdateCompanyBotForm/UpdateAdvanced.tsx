'use client'

import { Input } from '@/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reusable/form/select'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Textarea } from '@/components/reusable/form/textarea'
import { formattingOrStructures, frameworkOrModels, toneAndStyles } from '@/constants/bot'

export default function UpdateAdvanced() {
  return (
    <SingleAccordion value='advanced' label='Advanced'>
      <Input name='sounds_like' label='Sounds like' placeholder='Sounds like' />
      <Textarea name='context' label='Context' placeholder='Type Context here...' rows={4} />
      <Select name='tone_and_style' label='Tone & Style'>
        <SelectTrigger>
          <SelectValue placeholder='Tone And Style' />
        </SelectTrigger>
        <SelectContent>
          {toneAndStyles.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name='framework' label='Frame or Model (if applicable)'>
        <SelectTrigger>
          <SelectValue placeholder='Frame or Model' />
        </SelectTrigger>
        <SelectContent>
          {frameworkOrModels?.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name='format' label='Formatting or Structure'>
        <SelectTrigger>
          <SelectValue placeholder='Formatting or Structure' />
        </SelectTrigger>
        <SelectContent>
          {formattingOrStructures?.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea name='objective' label='Objective' placeholder='Type Objective here...' rows={4} />
      <Textarea
        name='target_audience'
        label='Target Audience'
        placeholder='Write about Target Audience here...'
        rows={5}
      />
      <Textarea
        name='call_to_action'
        label='Call To Action'
        placeholder='Write about Call to Action here...'
        rows={5}
      />
    </SingleAccordion>
  )
}
