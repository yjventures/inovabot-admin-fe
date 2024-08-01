'use client'

import { FormProvider, useForm } from 'react-hook-form'
import Form from '@/components/reusable/form/form'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'

export default function FormExample() {
  const methods = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Input name='name' required label='Name' />
      <DnDUpload name='image' label='Image' required />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
