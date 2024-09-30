'use client'

import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CreateCategoryModal from './CreateCategoryModal'
import UpdateCategoryModal from './UpdateCategoryModal'

export default function AllCategories() {
  const { data, isSuccess, isLoading } = useGetCategoriesQuery({})

  const [open, setopen] = useState<boolean>(false)
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined)

  const [deleteCat, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError, error }] =
    useDeleteCategoryMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Category deleted successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isDeleteSuccess, isError, error])

  return (
    <>
      <DashboardHeading title='Bot Categories' extra={<CreateCategoryModal />} />

      <FormWrapper>
        <DashboardHeading title='All Categories' variant='h4' />

        {isLoading ? (
          <div className='flex flex-wrap gap-x-4 gap-y-3'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='h-10 w-32 rounded-full' />
            ))}
          </div>
        ) : null}

        {isSuccess ? (
          <div className='flex flex-wrap gap-x-4 gap-y-3'>
            {data?.categories?.length ? (
              data?.categories?.map(cat => (
                <p
                  key={cat._id}
                  className='border border-text-light bg-foreground px-4 py-2 rounded-full flex items-center gap-x-2 hover:bg-gray-primary text-sm font-semibold'
                >
                  {cat.title}
                  <UpdateCategoryModal id={cat._id} />
                  <Trash2
                    className='size-5 cursor-pointer text-destructive'
                    onClick={() => {
                      setopen(true)
                      setdeleteId(cat._id)
                    }}
                  />
                </p>
              ))
            ) : (
              <p className='text-text-secondary italic mt-5'>No categories created yet</p>
            )}
          </div>
        ) : null}
      </FormWrapper>

      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        title='Are you sure to delete this category?'
        cb={() => deleteCat(deleteId!)}
        isLoading={isDeleteLoading}
      />
    </>
  )
}
