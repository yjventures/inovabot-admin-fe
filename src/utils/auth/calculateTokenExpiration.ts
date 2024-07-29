import { jwtDecode, JwtPayload } from 'jwt-decode'

/**
 * Calculate the token expiration so that token can be saved in cookies with a expiry time
 */
export const calculateTokenExpiration = (token: string): number => {
  const tokenData = jwtDecode<JwtPayload>(token)

  const issuedAt = new Date((tokenData?.iat ?? 0) * 1000)
  const expiredAt = new Date((tokenData?.exp ?? 0) * 1000)

  const timeDifference = expiredAt.getTime() - issuedAt.getTime()
  return timeDifference
}
