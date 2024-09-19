'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCreateBotLinkMutation } from '@/redux/features/linksApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Paperclip } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function BotLinkCreateModal() {
  const { id } = useParams()
  const methods = useForm()
  const { handleSubmit } = methods
  const [open, setopen] = useState<boolean>(false)

  const [addBotLink, { isLoading, isSuccess, isError, error }] = useCreateBotLinkMutation()
  const onSubmit = (data: any) => addBotLink({ ...data, bot_id: id as string })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot Link added successfully!')
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
        <Button variant='black' icon={<Paperclip />}>
          Add Bot Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Bot Link</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='link' label='Link' placeholder='https://facebook.com' />
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
