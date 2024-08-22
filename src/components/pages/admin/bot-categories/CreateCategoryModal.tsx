import Form from '@/components/reusable/form/form'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { Input } from '@/components/reusable/form/input'
import { useCreateCategoryMutation } from '@/redux/features/categoriesApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

export default function CreateCategoryModal() {
  const [open, setopen] = useState<boolean>(false)

  const methods = useForm()
  const { handleSubmit } = methods

  const [createCat, { isLoading, isSuccess, isError, error }] = useCreateCategoryMutation()
  const onSubmit = (data: any) => createCat(data)

  useEffect(() => {
    if (isSuccess) {
      setopen(false)
      toast.success('Category created successfully')
    }

    if (isError) {
      setopen(false)
      toast.error(rtkErrorMessage(error))
    }
  }, [isSuccess, isError, error])

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Button icon={<PlusSquare />} variant='gradient'>
          Create new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new bot category</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='title' label='Title' placeholder='Enter category title' required />
          <div className='flex justify-end'>
            <Button icon={<PlusSquare />} variant='gradient' type='submit' isLoading={isLoading}>
              Save
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
