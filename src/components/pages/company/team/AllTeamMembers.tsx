'use client'

import { getCompanyId } from '@/helpers/pages/companies'
import { useGetUsersQuery } from '@/redux/features/companiesApi'

export default function AllTeamMembers() {
  const { data } = useGetUsersQuery({ company_id: getCompanyId() })
  return <div>AllTeamMembers</div>
}
