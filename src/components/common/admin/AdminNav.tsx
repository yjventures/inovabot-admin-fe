'use client'

import { useState } from 'react'
import AdminMobileNav from './AdminMobileNav'
import AdminTopNav from './AdminTopNav'
import { IUser } from '@/types/IUser'
import AdminSideNav from './AdminSideNav'

interface Props {
  currentLink?: string
}

export default function AdminNav({ currentLink }: Props) {
  //const { data } = useGetAdminPersonalInfoQuery()
  const data = {} as IUser
  const [navbarOpen, setnavbarOpen] = useState(false)
  return (
    <>
      <AdminSideNav currentLink={currentLink} />
      <AdminTopNav user={data} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
      <AdminMobileNav user={data} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} currentLink={currentLink} />
    </>
  )
}
