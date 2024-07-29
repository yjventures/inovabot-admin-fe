import { getCookie } from 'cookies-next'

export const getToken = (): string | undefined => {
  const accessToken = getCookie('accessToken')
  return accessToken
}
