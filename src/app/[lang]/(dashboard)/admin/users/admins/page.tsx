import AllAdmins from '@/components/pages/admin/users/AllAdmins'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export const metadata = {
  title: 'Admins | Inova'
}

export default function AdminsPage() {
  return (
    <div>
      <DashboardHeading
        title='Admins'
        extra={
          <LLink href='/admin/users/invite-admin'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Invite admin
            </Button>
          </LLink>
        }
      />
      <AllAdmins />
    </div>
  )
}
