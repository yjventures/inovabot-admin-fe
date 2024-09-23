'use client'

import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Search from '@/components/reusable/tables/search'
import TableActions from '@/components/reusable/tables/table-actions'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initParams } from '@/constants/form/init-params'
import { useDeleteFAQMutation, useGetFAQsQuery, useUpdateFAQMutation } from '@/redux/features/faqApi'
import { IParams } from '@/types/common/IParams'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FAQCreateModal from './FAQCreateModal'
import FAQDetailsModal from './FAQDetailsModal'
import FAQUpdateModal from './FAQUpdateModal'

export default function FAQPageComp() {
  const { id } = useParams()

  type Params = IParams & { bot_id: string }

  const [search, setsearch] = useState<string>('')
  const [params, setparams] = useState<Params>({ ...initParams({}), bot_id: id as string })
  const { data } = useGetFAQsQuery({ ...params, search })
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
      <DashboardHeading title='FAQ' extra={<FAQCreateModal />} />

      <Search
        searchValue={search}
        setsearchValue={setsearch}
        className='max-w-xl w-full mb-6 rounded-lg'
        placeholder='Search FAQ'
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

      <TablePagination
        params={params}
        setparams={setparams as Dispatch<SetStateAction<IParams>>}
        metadata={data?.metadata!}
      />

      <ConfirmationPrompt open={open} onOpenChange={setopen} cb={deleteFAQFn} />
    </div>
  )
}
