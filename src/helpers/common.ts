import { getCookie } from 'cookies-next'

export const getDashboardURLPath = (): string => {
  const user = getCookie('userData')
  const userData = user && JSON.parse(user as string)
  const role = userData?.type
  if (['company-admin', 'user'].includes(role)) {
    return '/company'
  } else if (['super-admin', 'admin'].includes(role)) {
    return '/admin'
  } else if (role === 'reseller') {
    return '/reseller'
  }
}

export const getUserRole = () => {
  const user = getCookie('userData')
  const userData = user && JSON.parse(user as string)
  const role = userData?.type

  if (role === 'super-admin') return 'super-admin'
  else if (role === 'admin') return 'admin'
  else if (role === 'company-admin') return 'company-admin'
  else if (role === 'reseller') return 'reseller'
  else if (role === 'user') {
    if (userData?.company_position === 'editor') return 'editor'
    else return 'viewer'
  }
}
