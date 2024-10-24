import RecentCompanies from '@/components/pages/admin/companies/RecentCompanies'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export const metadata = {
  title: 'Companies | Inova'
}

export default function CompaniesPage() {
  return (
    <>
      <DashboardHeading
        title='Recent Companies'
        extra={
          <>
            <LLink href='/admin/companies/view-all'>
              <Button variant='outline'>View All</Button>
            </LLink>
            <LLink href='/admin/companies/create'>
              <Button variant='gradient' icon={<PlusSquare />}>
                Create Company
              </Button>
            </LLink>
          </>
        }
      />
      <RecentCompanies />
    </>
  )
}
