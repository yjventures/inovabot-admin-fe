import ResellerTeamMembers from '@/components/pages/reseller/team/ResellerTeamMembers'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export default function ResellerTeamPage() {
  return (
    <>
      <DashboardHeading title='Team' />
      <ResellerTeamMembers />
    </>
  )
}
