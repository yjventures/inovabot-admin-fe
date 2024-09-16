import AllTemplates from '@/components/pages/admin/templates/AllTemplates'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export const metadata = {
  title: 'Templates | Inova'
}
export default function AllTemplatesPage() {
  return (
    <>
      <DashboardHeading
        title='Bot Templates'
        extra={
          <LLink href='/admin/templates/create'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Create Template
            </Button>
          </LLink>
        }
      />
      <Tutorial
        videoId='qXgYQgCRqz8'
        title='Learn More'
        description='about the importance of having an AI chatbot'
        ctaLabel='Learn More'
        ctaHref='/'
        className='mb-10'
      />
      <AllTemplates />
    </>
  )
}
