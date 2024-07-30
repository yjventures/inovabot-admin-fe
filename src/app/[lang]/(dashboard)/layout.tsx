import AdminNav from '@/components/common/admin/AdminNav'
import React, { ReactNode } from 'react'
import { LayoutProps } from '../../../../.next/types/app/[lang]/layout'
import { cookies, headers } from 'next/headers'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const allCookies = cookies()
  const currentNavLink = allCookies.get('currentNavLink')?.value
  return (
    <>
      <AdminNav currentLink={currentNavLink} />
      <section className='pt-24 pl-7 lg:pl-[292px] pr-7 pb-7 bg-background'>{children}</section>
    </>
  )
}
