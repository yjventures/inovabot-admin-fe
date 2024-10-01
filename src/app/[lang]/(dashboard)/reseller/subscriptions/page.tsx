import ResellerActiveSubscription from '@/components/pages/reseller/subscriptions/ResellerActiveSubscription'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Subscriptions'
}

export default function ResellerSubscriptionPage() {
  return (
    <>
      <DashboardHeading title='Active Subscriptions' />
      <ResellerActiveSubscription />
    </>
  )
}
