'use client'

import logo from '@/assets/images/common/logo.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import { AdminLink, platformAdminLinks } from '@/constants/admin-nav-links'
import { companymAdminLinks } from '@/constants/admin-nav-links/company-admin-links'
import usePush from '@/hooks/usePush'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../../../redux/hooks/index'
import { logoutActions } from '../../../../utils/auth/logoutActions'
import AdminLinks from './AdminLinks'

interface Props {
  currentLink?: string
}

export default function AdminSideNav({ currentLink }: Props) {
  const push = usePush()
  const dispatch = useAppDispatch()

  const [links, setlinks] = useState<AdminLink[]>([])

  useEffect(() => {
    const userData = getCookie('userData')
    const user = userData && JSON.parse(userData)
    const userRole = user?.type

    if (userRole === 'super-admin') {
      setlinks(platformAdminLinks)
    } else if (userRole === 'company-admin') {
      setlinks(companymAdminLinks)
    }
  }, [])

  // const { data, isSuccess, isLoading } = useGetWebfrontQuery({ type: 'logo' })
  //const title = data?.data?.title

  const handleLogout = () => {
    logoutActions(dispatch, () => {
      toast.success('Logged out successfully!')
      push('/')
    })
  }

  return (
    <nav className='fixed top-0 left-0 w-[264px] border-r bg-foreground border-r-gray-primary h-screen hidden lg:flex flex-col items-center justify-between overflow-y-auto'>
      <div className='flex flex-col items-center justify-center w-full'>
        <LLink href='/' className='mb-5 w-full p-5'>
          {/* {isLoading ? <Skeleton className='w-28 h-7 rounded-sm' /> : isSuccess ? title : 'Dashboard'} */}
          <Img src={logo} alt='Inova' className='h-8 w-auto' />
        </LLink>

        <AdminLinks links={links} currentLink={currentLink} />
      </div>

      <div className='p-5 w-full'>
        <Button onClick={handleLogout} className='w-full rounded-md h-12'>
          Log Out
        </Button>
      </div>
    </nav>
  )
}
