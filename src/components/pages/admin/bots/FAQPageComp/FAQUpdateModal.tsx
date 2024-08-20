'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PencilLine } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface IFAQ {
  question: string
  answer: string
}

interface Props {
  faq: IFAQ
}

export default function FAQUpdateModal({ faq }: Props) {
  const { id } = useParams()
  const methods = useForm<IFAQ>()

  const { reset, handleSubmit } = methods

  useEffect(() => {
    if (faq) reset(faq)
  }, [reset, faq])

  const onSubmit = (data: IFAQ) => {
    console.log(data)
    //TODO: when api will be ready, save the faq to the database with the bot id
  }
  return (
    <Dialog>
      <DialogTrigger>
        <PencilLine className='text-blue-primary' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit FAQ</DialogTitle>
        </DialogHeader>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='question' label='Question' placeholder='Question' />
          <Textarea name='answer' label='Answer' placeholder='Answer' />
          <div className='flex justify-end'>
            <Button type='submit' variant='black'>
              Save
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
