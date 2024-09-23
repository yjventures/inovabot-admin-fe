'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reusable/form/select'

import { Checkbox } from '@/components/reusable/form/checkbox'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

export default function FormExample() {
  const methods = useForm()
  const onSubmit = () => {}

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className='bg-foreground p-5 rounded-md'>
      <Input name='name' required label='Name' placeholder='First Name' />
      <Textarea name='first_name' required placeholder='First Name' label='Company Name' />
      <DnDUpload name='image' text='Company Logo Light Mode' label='Company Logo' />

      <Select name='theme' label='Theme'>
        <SelectTrigger className='max-w-sm'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
      <Checkbox name='is_active' label='Is Active?' />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
