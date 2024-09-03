import { getCookie } from 'cookies-next'

export const getCompanyId = (): string => {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData as string)
  const id = user?.company_id
  return id
}
