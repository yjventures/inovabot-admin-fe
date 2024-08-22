import Form from '@/components/reusable/form/form'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'
import { Input } from '@/components/reusable/form/input'
import { useGetCategoryQuery, useUpdateCategoryMutation } from '@/redux/features/categoriesApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

interface Props {
  id: string
}
export default function UpdateCategoryModal({ id }: Props) {
  const methods = useForm()
  const { handleSubmit, reset } = methods

  const { data, isSuccess: isFetchSuccess } = useGetCategoryQuery(id)
  useEffect(() => {
    if (isFetchSuccess) reset(data?.data)
  }, [isFetchSuccess, data, reset])

  const [open, setopen] = useState<boolean>(false)

  const [updateCat, { isLoading, isSuccess, isError, error }] = useUpdateCategoryMutation()
  const onSubmit = (data: any) => updateCat({ id, body: data })

  useEffect(() => {
    if (isSuccess) {
      setopen(false)
      toast.success('Category updated successfully')
    }

    if (isError) {
      setopen(false)
      toast.error(rtkErrorMessage(error))
    }
  }, [isSuccess, isError, error])

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <PencilLine className='size-5 cursor-pointer text-blue-primary' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update bot category</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='title' label='Title' placeholder='Enter category title' required />
          <div className='flex justify-end'>
            <Button icon={<PencilLine />} variant='gradient' type='submit' isLoading={isLoading}>
              Update
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
