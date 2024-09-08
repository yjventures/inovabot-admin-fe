'use client'

import { AdminLink, platformAdminLinks } from '@/constants/admin-nav-links'
import { companyAdminLinks } from '@/constants/admin-nav-links/company-admin-links'
import { companyViewerLinks } from '@/constants/admin-nav-links/company-viewer-links'
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

    if (['super-admin', 'admin'].includes(userRole)) {
      setlinks(platformAdminLinks)
    } else if (['company-admin'].includes(userRole)) {
      setlinks(companyAdminLinks)
    } else if (userRole === 'user') {
      if (user?.company_position === 'viewer') {
        setlinks(companyViewerLinks)
      }
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
