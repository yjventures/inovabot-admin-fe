'use client'

import { useForm } from 'react-hook-form'
import Form from '@/components/reusable/form/form'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/reusable/form/textarea'

export default function FormExample() {
  const methods = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className='bg-white p-5 rounded-md'>
      <Input name='name' required showLabel placeholder='First Name' />
      <Textarea name='first_name' required showLabel placeholder='First Name' />
      <DnDUpload name='image' label='Image' required text='Company Logo Light Mode' />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
