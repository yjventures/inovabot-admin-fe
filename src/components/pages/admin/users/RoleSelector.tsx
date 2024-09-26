'use client'

import { Button } from '@/components/ui/button'
import { IParams } from '@/types/common/IParams'
import { Dispatch, SetStateAction, useState } from 'react'

type Params = IParams & { search: string; type?: string }

interface Props {
  setparams: Dispatch<SetStateAction<Params>>
}

const roles = [
  { label: 'All', value: '' },
  { label: 'Admins', value: 'admin' },
  { label: 'Company Admins', value: 'company-admin' },
  { label: 'Resellers', value: 'reseller' }
]

export default function RoleSelector({ setparams }: Props) {
  const [selectedRole, setselectedRole] = useState(roles[0])
  const handleRole = userRole => {
    setselectedRole(userRole)
    if (userRole.value) setparams(prevParams => ({ ...prevParams, type: userRole.value }))
    else setparams(prevParams => ({ ...prevParams, type: undefined }))
  }

  return (
    <div className='flex flex-wrap gap-1 border rounded-lg p-1 shadow-md bg-foreground'>
      {roles.map(role => (
        <Button
          key={role.value}
          size='sm'
          onClick={() => handleRole(role)}
          variant={selectedRole.value === role.value ? 'black' : 'outline'}
          className='h-8'
        >
          {role.label}
        </Button>
      ))}
    </div>
  )
}
