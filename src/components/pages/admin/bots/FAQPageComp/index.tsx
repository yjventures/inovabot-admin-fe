'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { FileQuestion, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TableActions from '@/components/reusable/tables/table-actions'
import FAQDetailsModal from './FAQDetailsModal'
import FAQUpdateModal from './FAQUpdateModal'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import { useDeleteFAQMutation, useGetFAQsQuery, useUpdateFAQMutation } from '@/redux/features/faqApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

export default function FAQPageComp() {
  const { data } = useGetFAQsQuery({})
  const [updateFAQ, { isSuccess, isError, error }] = useUpdateFAQMutation()

  const [open, setopen] = useState<boolean>(false)
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined)

  const [deleteFAQ, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteFAQMutation()

  const deleteFAQFn = () => {
    deleteFAQ(deleteId!)
  }

  useEffect(() => {
    if (isSuccess) toast.success('FAQ updated successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  useEffect(() => {
    if (isDeleteSuccess) toast.success('FAQ deleted successfully!')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <div>
      <DashboardHeading
        title='FAQ'
        extra={
          <Button variant='black' icon={<FileQuestion />}>
            Add FAQ
          </Button>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FAQ</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((faq, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium text-sm'>{faq.question}</TableCell>
              <TableCell>
                <TableActions>
                  <FAQDetailsModal faq={faq} />
                  {faq.active ? (
                    <ToggleLeft
                      className='text-red-500 cursor-pointer'
                      onClick={() => updateFAQ({ id: faq._id, body: { active: false } })}
                    />
                  ) : (
                    <ToggleRight
                      className='text-emerald-500 cursor-pointer'
                      onClick={() => updateFAQ({ id: faq._id, body: { active: true } })}
                    />
                  )}
                  <FAQUpdateModal faq={faq} />
                  <Trash2
                    className='text-destructive cursor-pointer'
                    onClick={() => {
                      setopen(true)
                      setdeleteId(faq._id)
                    }}
                  />
                </TableActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmationPrompt open={open} onOpenChange={setopen} cb={deleteFAQFn} />
    </div>
  )
}
