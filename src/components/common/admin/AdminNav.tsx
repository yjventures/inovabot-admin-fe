'use client'

import { useState } from 'react'
import AdminMobileNav from './AdminMobileNav'
import AdminSideNav from './AdminSideNav'
import AdminTopNav from './AdminTopNav'
import { IUser } from '@/types/IUser'

export default function AdminNav() {
  //const { data } = useGetAdminPersonalInfoQuery()
  const data = {} as IUser
  const [navbarOpen, setnavbarOpen] = useState(false)
  return (
    <>
      <AdminSideNav />
      <AdminTopNav user={data} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
      <AdminMobileNav user={data} navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
    </>
  )
}
