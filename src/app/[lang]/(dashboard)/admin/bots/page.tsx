import AllBots from '@/components/pages/admin/bots'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { PlusSquare } from 'lucide-react'
import React from 'react'

export const metadata = {
  title: 'All Bots | Inova'
}

export default function BotsPage() {
  return (
    <div>
      <DashboardHeading
        title='Chat Assistants'
        extra={
          <LLink href='/admin/bots/create'>
            <Button variant='gradient' icon={<PlusSquare />}>
              Create Assistant
            </Button>
          </LLink>
        }
      />
      <Tutorial
        videoId='oPVgo3jOUAc'
        title='Tutorial Title'
        description='Tutorial Description'
        ctaLabel='Tutorial CTA'
        ctaHref='/'
        className='mb-10'
      />
      <AllBots />
    </div>
  )
}
