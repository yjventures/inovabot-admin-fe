import InviteTeamForm from '@/components/pages/company/team/InviteTeamForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Invite Team Members'
}

export default function TeamInvitePage() {
  return (
    <>
      <DashboardHeading title='Invite Team Members' />
      <InviteTeamForm />
    </>
  )
}
