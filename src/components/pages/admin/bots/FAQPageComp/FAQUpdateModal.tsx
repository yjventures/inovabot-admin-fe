'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUpdateFAQMutation } from '@/redux/features/faqApi'
import { WithId } from '@/types/common/IResponse'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IFAQ } from '../UpdateBotForm/FAQ'

interface Props {
  faq: WithId<IFAQ>
}

export default function FAQUpdateModal({ faq }: Props) {
  const methods = useForm<IFAQ>()

  const [open, setopen] = useState<boolean>(false)

  const { reset, handleSubmit } = methods

  useEffect(() => {
    if (faq) reset(faq)
  }, [reset, faq])

  const [updateFAQ, { isLoading, isSuccess, isError, error }] = useUpdateFAQMutation()

  const onSubmit = (data: IFAQ) => {
    updateFAQ({ id: faq._id, body: data })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('FAQ updated successfully!')
      setopen(false)
    }
    if (isError) {
      toast.error(rtkErrorMessage(error))
      setopen(false)
    }
  }, [isSuccess, isError, error])

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <PencilLine className='text-blue-primary' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit FAQ</DialogTitle>
        </DialogHeader>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='question' label='Question' placeholder='Question' />
          <Textarea name='objective' label='Objective' placeholder='Objective' />
          <div className='flex justify-end'>
            <Button type='submit' variant='gradient' isLoading={isLoading}>
              Save
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
