'use client'

import { AdminLink, platformAdminLinks } from '@/constants/admin-nav-links'
import { companymAdminLinks } from '@/constants/admin-nav-links/company-admin-links'
import { IUser } from '@/types/IUser'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import AdminMobileNav from './AdminMobileNav'
import AdminSideNav from './AdminSideNav'
import AdminTopNav from './AdminTopNav'

interface Props {
  currentLink?: string
}

export default function AdminNav({ currentLink }: Props) {
  //const { data } = useGetAdminPersonalInfoQuery()
  const data = {} as IUser
  const [navbarOpen, setnavbarOpen] = useState(false)

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
  return (
    <>
      <AdminSideNav currentLink={currentLink} links={links} />
      <AdminTopNav user={data} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
      <AdminMobileNav
        user={data}
        navbarOpen={navbarOpen}
        setnavbarOpen={setnavbarOpen}
        currentLink={currentLink}
        links={links}
      />
    </>
  )
}
