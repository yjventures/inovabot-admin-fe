import ViewAllCompanies from '@/components/pages/admin/companies/ViewAllCompanies'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export default function ResellersCompanies() {
  return (
    <div>
      <DashboardHeading
        title='All Companies'
        extra={
          <LLink href='/reseller/companies/create'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Create Company
            </Button>
          </LLink>
        }
      />
      <ViewAllCompanies from='reseller' />
    </div>
  )
}
