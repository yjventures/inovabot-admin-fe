import avatar from '@/assets/images/common/avatar.png'
import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/IUser'
import { ChevronDown } from 'lucide-react'

interface Props {
  user: IUser
  className?: string
  darkBg?: boolean
}

export default function UserInfo({ user, className, darkBg }: Props) {
  const role = user?.type
  return (
    <div className={cn('items-center gap-3 cursor-pointer', className)}>
      {user?.image ? (
        <Img src={user?.image} alt={user?.name} className='w-8 h-8 object-cover border rounded-full' />
      ) : (
        <Img src={avatar} alt='User' className='w-8 h-8 object-cover border rounded-full' />
      )}
      <div className={cn('flex flex-col', { 'text-foreground': darkBg })}>
        <p className='text-sm'>{user?.name}</p>
        <p className='text-xs text-text-primary-muted'>
          {role ? role?.slice(0, 1)?.toUpperCase() + role?.slice(1) : null}
        </p>
      </div>
      <ChevronDown className={cn('w-4.5 h-4.5 text-secondary-foreground', { 'text-foreground': darkBg })} />
    </div>
  )
}
