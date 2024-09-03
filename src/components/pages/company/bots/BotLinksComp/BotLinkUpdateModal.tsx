'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUpdateBotLinkMutation } from '@/redux/features/linksApi'
import { WithId } from '@/types/common/IResponse'
import { IBotLink } from '@/types/ILink'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  botLink: WithId<IBotLink>
}

export default function BotLinkUpdateModal({ botLink }: Props) {
  const methods = useForm<IBotLink>()

  const [open, setopen] = useState<boolean>(false)

  const { reset, handleSubmit } = methods

  useEffect(() => {
    if (botLink) reset(botLink)
  }, [reset, botLink])

  const [updateBotLink, { isLoading, isSuccess, isError, error }] = useUpdateBotLinkMutation()

  const onSubmit = (data: IBotLink) => {
    updateBotLink({ id: botLink._id, body: data })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot Link updated successfully!')
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
          <DialogTitle>Edit Bot Link</DialogTitle>
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
