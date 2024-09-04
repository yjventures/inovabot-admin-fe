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
        videoId='oPVgo3jOUAc'
        title='Tutorial Title'
        description='Tutorial Description'
        ctaLabel='Tutorial CTA'
        ctaHref='/'
        className='mb-10'
      />
      <ActiveSubscription />
    </>
  )
}
