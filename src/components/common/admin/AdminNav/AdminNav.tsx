'use client'

import { AdminLink, platformAdminLinks } from '@/constants/admin-nav-links'
import { companyAdminLinks } from '@/constants/admin-nav-links/company-admin-links'
import { companyEditorLinks } from '@/constants/admin-nav-links/company-editor-links'
import { companyViewerLinks } from '@/constants/admin-nav-links/company-viewer-links'
import { useGetUserQuery } from '@/redux/features/usersApi'
import { getUserId } from '@/utils/auth/getUserId'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import AdminMobileNav from './AdminMobileNav'
import AdminSideNav from './AdminSideNav'
import AdminTopNav from './AdminTopNav'

interface Props {
  currentLink?: string
}

export default function AdminNav({ currentLink }: Props) {
  const { data } = useGetUserQuery(getUserId())
  console.log(data.user)
  //const data = {} as IUser
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
      } else {
        setlinks(companyEditorLinks)
      }
    }
  }, [])
  return (
    <>
      <AdminSideNav currentLink={currentLink} links={links} setnavbarOpen={setnavbarOpen} />
      <AdminTopNav user={data?.user} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
      <AdminMobileNav
        user={data?.user}
        navbarOpen={navbarOpen}
        setnavbarOpen={setnavbarOpen}
        currentLink={currentLink}
        links={links}
      />
    </>
  )
}
