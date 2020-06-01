import jwtDecode from 'jwt-decode'
import { fromUnixTime, isFuture } from 'date-fns'

export const validateAuth = (token: string): boolean => {
  if (!token || token === '') {
    return false
  }
  const { exp } = jwtDecode(token)
  const expDate = fromUnixTime(exp)

  return isFuture(expDate)
}

export const userName = (token: string): boolean => {
  const { username } = jwtDecode(token)

  return username
}
