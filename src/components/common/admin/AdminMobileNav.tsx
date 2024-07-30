'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import UserInfo from './UserInfo'
import { useAppDispatch } from '../../../redux/hooks'
import { logoutActions } from '../../../utils/auth/logoutActions'
import { IUser } from '@/types/IUser'
import { Dispatch, SetStateAction } from 'react'
import AdminLinks from './AdminLinks'
import { platformAdminLinks } from '@/constants/admin-nav-links'

interface Props {
  user: IUser
  navbarOpen: boolean
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdminMobileNav({ user, navbarOpen, setnavbarOpen }: Props) {
  const push = usePush()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    logoutActions(dispatch, () => {
      toast.success('Logged out successfully!')
      push('/')
      setnavbarOpen(false)
    })
  }

  //const { data, isSuccess, isLoading } = useGetWebfrontQuery({ type: 'logo' })
  //const title = data?.data?.title
  const title = 'Title'

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 bg-gray-800 w-[230px] h-screen p-5 flex flex-col items-center justify-between transition-all duration-500 z-50',
        {
          '-right-[230px]': !navbarOpen
        }
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex items-center justify-between gap-4 mb-5'>
          <LLink href='/' className='font-medium text-lg tracking-[3px] text-white uppercase'>
            {/* {isLoading ? <Skeleton className='w-28 h-7 rounded-sm' /> : isSuccess ? title : 'Dashboard'} */}
            Dashboard
          </LLink>
          <X className='text-white cursor-pointer size-7' strokeWidth={1.5} onClick={() => setnavbarOpen(false)} />
        </div>

        <UserInfo user={user} className='flex md:hidden mb-5' darkBg />

        <AdminLinks links={platformAdminLinks} />
      </div>

      <Button onClick={handleLogout} className='w-full rounded-md h-12'>
        Log Out
      </Button>
    </nav>
  )
}
