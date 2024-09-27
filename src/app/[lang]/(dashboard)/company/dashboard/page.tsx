import Analytics from '@/components/pages/admin/dashboard/Analytics'
import DashboardButtons from '@/components/pages/admin/dashboard/DashboardButtons'
import RecentBots from '@/components/pages/admin/dashboard/RecentBots'
import RecentTemplates from '@/components/pages/admin/dashboard/RecentTemplates'
import Tutorial from '@/components/reusable/dashboard/tutorial'

export const metadata = {
  title: 'Dashboard'
}

export default function DashboardPage() {
  return (
    <>
      <Analytics />
      <Tutorial
        videoId='qXgYQgCRqz8'
        title='Learn More'
        description='about the importance of having an AI chatbot'
        ctaLabel='Learn More'
        ctaHref='/'
        className='my-10'
      />
      <DashboardButtons />

      <RecentTemplates />
      <RecentBots />
    </>
  )
}
