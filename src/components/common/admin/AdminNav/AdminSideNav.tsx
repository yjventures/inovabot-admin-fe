'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../../../redux/hooks/index'
import { logoutActions } from '../../../../utils/auth/logoutActions'
import AdminLinks from './AdminLinks'
import { platformAdminLinks } from '@/constants/admin-nav-links'
import logo from '@/assets/images/common/logo.png'
import { Img } from '@/components/ui/img'

interface Props {
  currentLink?: string
}

export default function AdminSideNav({ currentLink }: Props) {
  const push = usePush()
  const dispatch = useAppDispatch()

  // const { data, isSuccess, isLoading } = useGetWebfrontQuery({ type: 'logo' })
  //const title = data?.data?.title

  const handleLogout = () => {
    logoutActions(dispatch, () => {
      toast.success('Logged out successfully!')
      push('/')
    })
  }

  return (
    <nav className='fixed top-0 left-0 w-[264px] border-r bg-white border-r-gray-primary h-screen hidden lg:flex flex-col items-center justify-between overflow-y-auto'>
      <div className='flex flex-col items-center justify-center w-full'>
        <LLink href='/' className='mb-5 w-full p-5'>
          {/* {isLoading ? <Skeleton className='w-28 h-7 rounded-sm' /> : isSuccess ? title : 'Dashboard'} */}
          <Img src={logo} alt='Inova' className='h-8 w-auto' />
        </LLink>

        <AdminLinks links={platformAdminLinks} currentLink={currentLink} />
      </div>

      <div className='p-5 w-full'>
        <Button onClick={handleLogout} className='w-full rounded-md h-12'>
          Log Out
        </Button>
      </div>
    </nav>
  )
}
