'use client'

import CardAvatar from '@/components/reusable/cards/commonn/card-avatar'
import Search from '@/components/reusable/tables/search'
import TablePagination from '@/components/reusable/tables/table-pagination'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import TableSorter from '@/components/reusable/tables/table-sorter'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initParams } from '@/constants/form/init-params'
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/features/usersApi'
import { IParams } from '@/types/common/IParams'
import { WithId } from '@/types/common/IResponse'
import { IUser } from '@/types/IUser'
import { genUserRole } from '@/utils/auth/genUserRole'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AllResellers() {
  const [search, setsearch] = useState<string>('')

  type Params = IParams & { search: string; type?: string }
  const [params, setParams] = useState<Params>({ ...initParams({}), search, type: 'reseller' })

  useEffect(() => {
    setParams(prevParams => ({ ...prevParams, search }))
  }, [search])

  const { data, isLoading, isSuccess } = useGetUsersQuery(params)

  // deleting users
  const [removeMember, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteUserMutation()

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Reseller deleted successfully')
      // refresh()
    }
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center gap-x-5 mb-6 gap-y-2'>
        <Search
          searchValue={search}
          setsearchValue={setsearch}
          placeholder='Search by user name'
          className='max-w-sm'
        />
      </div>

      {isLoading ? <TableSkeleton /> : null}
      {isSuccess ? (
        data?.data?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <TableSorter params={params} setparams={setParams} sortField='name'>
                    User
                  </TableSorter>
                </TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setParams} sortField='email'>
                    Email
                  </TableSorter>
                </TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setParams} sortField='createdAt'>
                    Created At
                  </TableSorter>
                </TableHead>
                <TableHead>Total companies</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((user: WithId<IUser & { company?: { name: string } }>) => (
                <TableRow key={user?._id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <CardAvatar
                        imgSrc={user?.image}
                        name={user?.name}
                        className='size-12'
                        nameClassName='text-base'
                      />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{user?.name}</p>
                        <p className='text-xs text-text-primary-muted'>{genUserRole(user)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{formateDate(user?.createdAt)}</TableCell>
                  <TableCell>{(user as any).number_of_company}</TableCell>

                  <TableCell>
                    <Button icon={<Trash2 />} size='sm' variant='destructive' onClick={() => removeMember(user?._id)}>
                      Delete User
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='mt-10 italic text-text-secondary'>No resellers yet</p>
        )
      ) : null}

      <TablePagination
        params={params}
        setparams={setParams as Dispatch<SetStateAction<IParams>>}
        metadata={data?.metadata!}
      />
    </div>
  )
}
