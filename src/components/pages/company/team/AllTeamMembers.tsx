'use client'

import TableActions from '@/components/reusable/tables/table-actions'
import TablePagination from '@/components/reusable/tables/table-pagination'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initParams } from '@/constants/form/init-params'
import { getCompanyId } from '@/helpers/pages/companies'
import { useUpdateCompanyMemberRoleMutation } from '@/redux/features/companiesApi'
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/features/usersApi'
import { IParams } from '@/types/common/IParams'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2, UserPen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AllTeamMembers() {
  const { refresh } = useRouter()
  type Params = IParams & { company_id: string }
  const [params, setParams] = useState<Params>({ ...initParams({}), company_id: getCompanyId() })
  const { data, isLoading, isSuccess } = useGetUsersQuery(params)

  const [updateRole, { isLoading: isUpdateLoading, isSuccess: isRoleUpdateSuccess, isError, error }] =
    useUpdateCompanyMemberRoleMutation()
  const [
    removeMember,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteUserMutation()

  useEffect(() => {
    if (isRoleUpdateSuccess) {
      toast.success('User Role updated successfully')
      refresh()
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isRoleUpdateSuccess, isError, error, refresh])

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Team member removed successfully')
      refresh()
    }
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError, refresh])

  return (
    <div>
      {isLoading ? <TableSkeleton /> : null}
      {isSuccess ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map(user => (
              <TableRow key={user?._id}>
                <TableCell className='font-medium'>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  {user?.type === 'company-admin'
                    ? 'Company Admin'
                    : user?.company_position === 'editor'
                    ? 'Editor'
                    : 'Viewer'}
                </TableCell>
                <TableCell>
                  <TableActions>
                    {user.type === 'user' && (
                      <Button
                        icon={<UserPen />}
                        size='sm'
                        variant='default'
                        onClick={() =>
                          updateRole({
                            user_id: user?._id,
                            role_name: user?.company_position === 'editor' ? 'viewer' : 'editor'
                          })
                        }
                        isLoading={isUpdateLoading}
                      >
                        Make {user?.company_position === 'editor' ? 'Viewer' : 'Editor'}
                      </Button>
                    )}
                    {user.type !== 'company-admin' && (
                      <Button
                        icon={<Trash2 />}
                        size='sm'
                        variant='destructive'
                        isLoading={isDeleteLoading}
                        onClick={() => removeMember(user?._id!)}
                      >
                        Remove Member
                      </Button>
                    )}
                  </TableActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      <TablePagination
        params={params}
        setparams={setParams as Dispatch<SetStateAction<IParams>>}
        metadata={data?.metadata!}
      />
    </div>
  )
}
