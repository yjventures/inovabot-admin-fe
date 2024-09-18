import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export const metadata = {
  title: 'Resellers | Inova'
}

export default function AdminResellersPage() {
  return (
    <>
      <DashboardHeading
        title='Resellers'
        extra={
          <LLink href='/admin/resellers/invite'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Invite a reseller
            </Button>
          </LLink>
        }
      />
    </>
  )
}
