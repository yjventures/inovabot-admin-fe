import { getCookie } from 'cookies-next'

export const getDashboardURLPath = () => {
  const user = getCookie('userData')
  const userData = user && JSON.parse(user as string)
  const role = userData?.type
  if (['company-admin', 'user'].includes(role)) {
    return '/company'
  } else if (['super-admin', 'admin'].includes(role)) {
    return '/admin'
  }
}
