import ViewAllCompanies from '@/components/pages/admin/companies/view-all'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'

export const metadata = {
  title: 'All Companies | Inova'
}

export default function ViewAllPage() {
  return (
    <>
      <DashboardHeading
        title='All Companies'
        extra={
          <LLink href='/admin/companies/create'>
            <Button variant='gradient'>Create Company</Button>
          </LLink>
        }
      />
      <ViewAllCompanies />
    </>
  )
}
