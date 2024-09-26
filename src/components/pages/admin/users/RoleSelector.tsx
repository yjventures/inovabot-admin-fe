'use client'

import { Button } from '@/components/ui/button'
import { IParams } from '@/types/common/IParams'
import { Dispatch, SetStateAction, useState } from 'react'

type Params = IParams & { search: string; type?: string }

interface Props {
  setparams: Dispatch<SetStateAction<Params>>
  roles: {
    label: string
    value: string
  }[]
}

export default function RoleSelector({ setparams, roles }: Props) {
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
