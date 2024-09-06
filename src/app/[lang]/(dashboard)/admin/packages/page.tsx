import AllPackages from '@/components/pages/admin/packages/AllPackages'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'

export const metadata = {
  title: 'All Packages | Inova'
}

export default function AllPackagesPage() {
  return (
    <div>
      <DashboardHeading
        title='Current Packages'
        extra={
          <LLink href='/admin/packages/create'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Create new package
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

      <AllPackages />
    </div>
  )
}
