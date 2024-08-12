import RecentCompanies from '@/components/pages/admin/companies'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'

export const metadata = {
  title: 'Companies'
}

export default function CompaniesPage() {
  return (
    <div>
      <DashboardHeading
        title='Recent Companies'
        extra={
          <>
            <LLink href='/admin/companies/view-all'>
              <Button variant='outline'>View All</Button>
            </LLink>
            <LLink href='/admin/companies/create'>
              <Button variant='gradient'>Create Company</Button>
            </LLink>
          </>
        }
      />
      <RecentCompanies />
    </div>
  )
}
