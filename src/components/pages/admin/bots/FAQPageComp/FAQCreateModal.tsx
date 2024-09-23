'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCreateFAQMutation } from '@/redux/features/faqApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { FileQuestion } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function FAQCreateModal() {
  const { id } = useParams()
  const methods = useForm()
  const { handleSubmit } = methods
  const [open, setopen] = useState<boolean>(false)

  const [addFAQ, { isLoading, isSuccess, isError, error }] = useCreateFAQMutation()
  const onSubmit = (data: any) => addFAQ({ ...data, bot_id: id as string })

  useEffect(() => {
    if (isSuccess) {
      toast.success('FAQ added successfully!')
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
        <Button variant='black' icon={<FileQuestion />}>
          Add FAQ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new FAQ</DialogTitle>
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
