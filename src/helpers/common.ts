import { getCookie } from 'cookies-next'

export const getDashboardURLPath = () => {
  const user = getCookie('userData')
  const userData = user && JSON.parse(user as string)
  const role = userData?.type
  if (role === 'company-admin') {
    return '/company'
  } else if (role === 'super-admin') {
    return '/admin'
  }
}
