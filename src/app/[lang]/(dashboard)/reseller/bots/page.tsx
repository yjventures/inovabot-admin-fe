import AllBots from '@/components/pages/reseller/bots'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare, SquareDashedMousePointer } from 'lucide-react'

export const metadata = {
  title: 'All Bots | Inova'
}

export default function BotsPage() {
  return (
    <div>
      <DashboardHeading
        title='Chat Assistants'
        extra={
          <>
            <LLink href='/admin/bots/choose-template'>
              <Button variant='gradient' icon={<SquareDashedMousePointer />}>
                Choose Templates
              </Button>
            </LLink>
            <LLink href='/admin/bots/create'>
              <Button variant='gradient' icon={<PlusSquare />}>
                Create Assistant
              </Button>
            </LLink>
          </>
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
      <AllBots />
    </div>
  )
}
