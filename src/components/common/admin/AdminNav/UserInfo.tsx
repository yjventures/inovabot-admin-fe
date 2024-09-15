import avatar from '@/assets/images/common/avatar.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/IUser'
import { formatValue } from '@/utils/misc/formatValue'
import { ChevronDown } from 'lucide-react'
import UpdateProfileModal from './UpdateProfileModal'

interface Props {
  user: IUser
  className?: string
  darkBg?: boolean
}

export default function UserInfo({ user, className, darkBg }: Props) {
  const role = user?.type
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
            <p className='text-xs text-text-primary-muted'>{formatValue(role, true)}</p>
          </div>
          <ChevronDown className={cn('w-4.5 h-4.5 text-secondary-foreground', { 'text-foreground': darkBg })} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UpdateProfileModal />
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
