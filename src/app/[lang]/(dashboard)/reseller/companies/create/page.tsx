import CreateResellerCompanyForm from '@/components/pages/admin/resellers/companies/CreateResellerCompanyForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Create a company'
}

export default function CreateResellerCompanyPage() {
  return (
    <div>
      <DashboardHeading title='Create a Company' />
      <CreateResellerCompanyForm />
    </div>
  )
}
