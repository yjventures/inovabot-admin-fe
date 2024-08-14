import CreateCompanyForm from '@/components/pages/admin/companies/create/CreateCompanyForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Add a Company | Inova'
}

export default function CreateCompanyPage() {
  return (
    <>
      <DashboardHeading title='Add a Company' />
      <CreateCompanyForm />
    </>
  )
}
