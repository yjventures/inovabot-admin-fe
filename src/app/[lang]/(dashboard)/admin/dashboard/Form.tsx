'use client'

import { FormProvider, useForm } from 'react-hook-form'
import Input from './input'

export default function Form() {
  const methods = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name='name' required />
        <input type='submit' />
      </form>
    </FormProvider>
  )
}
