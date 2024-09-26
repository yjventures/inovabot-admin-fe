import AdminInviteForm from '@/components/pages/admin/users/AdminInviteForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export default function InviteAdminPage() {
  return (
    <>
      <DashboardHeading title='Invite Admin' />
      <AdminInviteForm />
    </>
  )
}
