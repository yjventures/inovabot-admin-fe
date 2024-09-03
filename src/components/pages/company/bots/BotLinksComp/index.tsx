'use client'

import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Search from '@/components/reusable/tables/search'
import TableActions from '@/components/reusable/tables/table-actions'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initParams } from '@/constants/form/init-params'
import { useDeleteBotLinkMutation, useGetBotLinksQuery } from '@/redux/features/linksApi'
import { IParams } from '@/types/common/IParams'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BotLinkCreateModal from './BotLinkCreateModal'
import BotLinkDetailsModal from './BotLinkDetailsModal'
import BotLinkUpdateModal from './BotLinkUpdateModal'

export default function BotLinksComp() {
  const { id } = useParams()

  type Params = IParams & { bot_id: string }

  const [search, setsearch] = useState<string>('')
  const [params, setparams] = useState<Params>({ ...initParams({}), bot_id: id as string })
  const { data } = useGetBotLinksQuery({ ...params, search })

  const [open, setopen] = useState<boolean>(false)
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined)

  const [deleteBotLink, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteBotLinkMutation()

  const deleteBotLinkFn = () => {
    deleteBotLink(deleteId!)
  }

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Bot Link deleted successfully!')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <div>
      <DashboardHeading title='Bot Link' extra={<BotLinkCreateModal />} />

      <Search
        searchValue={search}
        setsearchValue={setsearch}
        className='max-w-xl w-full mb-6 rounded-lg'
        placeholder='Search Bot Link'
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead>Objective</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((botLink, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium text-sm text-blue-primary whitespace-nowrap overflow-hidden text-ellipsis max-w-md break-words break-all'>
                {botLink.link}
              </TableCell>
              <TableCell className='font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-md'>
                {botLink.objective}
              </TableCell>
              <TableCell>
                <TableActions>
                  <BotLinkDetailsModal botLink={botLink} />
                  <BotLinkUpdateModal botLink={botLink} />
                  <Trash2
                    className='text-destructive cursor-pointer'
                    onClick={() => {
                      setopen(true)
                      setdeleteId(botLink._id)
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

      <ConfirmationPrompt open={open} onOpenChange={setopen} cb={deleteBotLinkFn} />
    </div>
  )
}
