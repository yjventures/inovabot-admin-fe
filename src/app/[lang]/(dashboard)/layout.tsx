import AdminNav from '@/components/common/admin/AdminNav'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      <AdminNav />
      <section className='pt-24 pl-7 lg:pl-[258px] pr-7 pb-7'>{children}</section>
    </div>
  )
}
