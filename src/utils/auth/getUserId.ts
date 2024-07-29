import { getCookie } from 'cookies-next'

export const getUserId = (): string | undefined => {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData)
  return user?._id
}
