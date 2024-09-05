'use client'

import TableActions from '@/components/reusable/tables/table-actions'
import TablePagination from '@/components/reusable/tables/table-pagination'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initParams } from '@/constants/form/init-params'
import { getCompanyId } from '@/helpers/pages/companies'
import { useGetUsersQuery, useUpdateCompanyMemberRoleMutation } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2, UserPen } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AllTeamMembers() {
  type Params = IParams & { company_id: string }
  const [params, setParams] = useState<Params>({ ...initParams({}), company_id: getCompanyId() })
  const { data, isLoading, isSuccess } = useGetUsersQuery(params)

  const [updateRole, { isSuccess: isRoleUpdateSuccess, isError, error }] = useUpdateCompanyMemberRoleMutation()

  useEffect(() => {
    if (isRoleUpdateSuccess) toast.success('User Role updated successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isRoleUpdateSuccess, isError, error])

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
                            role: user?.company_position === 'editor' ? 'viewer' : 'editor'
                          })
                        }
                      >
                        Make {user?.company_position === 'editor' ? 'Viewer' : 'Editor'}
                      </Button>
                    )}
                    <Button icon={<Trash2 />} size='sm' variant='destructive'>
                      Remove Member
                    </Button>
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
