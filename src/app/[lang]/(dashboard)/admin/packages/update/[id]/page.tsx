import CreatePackageForm from '@/components/pages/admin/packages/CreatePackageForm'
import UdpatePackageForm from '@/components/pages/admin/packages/UdpatePackageForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import React from 'react'

export const metadata = {
  title: 'Update a Package | Inova'
}

export default function PackageUpdatePage() {
  return (
    <>
      <DashboardHeading title='Update a Package' />
      <UdpatePackageForm />
    </>
  )
}
