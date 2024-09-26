'use client'

import avatar from '@/assets/images/common/avatar.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/redux/hooks'
import { IUser } from '@/types/IUser'
import { genUserRole } from '@/utils/auth/genUserRole'
import { logoutActions } from '@/utils/auth/logoutActions'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  user: IUser
  className?: string
  darkBg?: boolean
}

export default function UserInfo({ user, className, darkBg }: Props) {
  const pathname = usePathname()
  const push = usePush()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    logoutActions(dispatch, () => {
      toast.success('Logged out successfully!')
      push('/check-token?to=logout')
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='text-left'>
        <div className={cn('items-center gap-3 cursor-pointer', className)}>
          {user?.image ? (
            <Img src={user?.image} alt={user?.name} className='w-8 h-8 object-cover border rounded-full' />
          ) : (
            <Img src={avatar} alt='User' className='w-8 h-8 object-cover border rounded-full' />
          )}
          <div className={cn('flex flex-col', { 'text-foreground': darkBg })}>
            <p className='text-sm'>Hello {user?.name}</p>
            <p className='text-xs text-text-primary-muted'>{genUserRole(user)}</p>
          </div>
          <ChevronDown className={cn('w-4.5 h-4.5 text-secondary-foreground', { 'text-foreground': darkBg })} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LLink href={`/update-profile?prevPath=${pathname}`}>
          <DropdownMenuItem>Update Profile</DropdownMenuItem>
        </LLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
