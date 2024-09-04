import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export default function TeamPage() {
  return (
    <>
      <DashboardHeading
        title='Team'
        extra={
          <LLink href='/company/team/invite'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Add Team Member
            </Button>
          </LLink>
        }
      />
    </>
  )
}
