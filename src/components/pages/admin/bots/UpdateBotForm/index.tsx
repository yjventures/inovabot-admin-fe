'use client'

import { useForm } from 'react-hook-form'
import ChatPreview from '../common/ChatPreview'
import Form from '@/components/reusable/form/form'
import { useParams } from 'next/navigation'
import { useGetBotQuery } from '@/redux/features/botsApi'
import { useEffect } from 'react'

export default function UpdateBotForm() {
  const { id } = useParams()
  const { data, isSuccess } = useGetBotQuery(id as string)
  console.log(data)
  const methods = useForm()
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (isSuccess) {
      reset(data?.bot)
    }
  }, [data, isSuccess, reset])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ChatPreview />
    </Form>
  )
}
