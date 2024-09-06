import ActiveSubscription from '@/components/pages/company/subscriptions/ActiveSubscription'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'

export const metadata = {
  title: 'Subscriptions'
}

export default function CompanySubscriptionsPage() {
  return (
    <>
      <DashboardHeading title='Current Subscription' />
      <Tutorial
        videoId='qXgYQgCRqz8'
        title='Learn More'
        description='about the importance of having an AI chatbot'
        ctaLabel='Learn More'
        ctaHref='/'
        className='mb-10'
      />
      <ActiveSubscription />
    </>
  )
}
