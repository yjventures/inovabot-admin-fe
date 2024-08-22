'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { PencilLine, PlusSquare, Trash2 } from 'lucide-react'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { Skeleton } from '@/components/ui/skeleton'
import CreateCategoryModal from './CreateCategoryModal'

export default function AllCategories() {
  const { data, isSuccess, isLoading } = useGetCategoriesQuery({})
  return (
    <>
      <DashboardHeading title='Bot Categories' extra={<CreateCategoryModal />} />

      <DashboardHeading title='All Categories' />
      {isLoading ? (
        <div className='flex flex-wrap gap-x-4 gap-y-3'>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className='h-10 w-32 rounded-full' />
          ))}
        </div>
      ) : null}
      {isSuccess ? (
        <div className='flex flex-wrap gap-x-4 gap-y-3'>
          {data?.categories?.map(cat => (
            <p
              key={cat._id}
              className='border border-text-light bg-foreground px-4 py-2 rounded-full flex items-center gap-x-2 hover:bg-gray-primary text-sm font-semibold'
            >
              {cat.title}
              <PencilLine className='size-5 cursor-pointer text-blue-primary' />
              <Trash2 className='size-5 cursor-pointer text-destructive' />
            </p>
          ))}
        </div>
      ) : null}
    </>
  )
}
