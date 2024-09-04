'use client'

import { getCompanyId } from '@/helpers/pages/companies'
import { useGetUsersQuery } from '@/redux/features/companiesApi'

export default function AllTeamMembers() {
  console.log(getCompanyId())
  const { data } = useGetUsersQuery({ company_id: getCompanyId() })
  console.log(data)
  return <div>AllTeamMembers</div>
}
