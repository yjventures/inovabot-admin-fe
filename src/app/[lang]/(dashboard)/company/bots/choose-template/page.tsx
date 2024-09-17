import ChooseTemplates from '@/components/pages/admin/bots/ChooseTemplates'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { ArrowRight } from 'lucide-react'

export default function ChooseTemplatesPage() {
  return (
    <>
      <DashboardHeading
        title='Chat Assistants'
        extra={
          <>
            <LLink href='/company/bots/create'>
              <Button variant='outline' icon={<ArrowRight />} iconPosition='right'>
                Continue without template
              </Button>
            </LLink>
          </>
        }
      />
      <ChooseTemplates from='company' />
    </>
  )
}
