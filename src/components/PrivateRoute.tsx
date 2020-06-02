import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useLocalStorage } from '@iteam/hooks'
import jwtDecode from 'jwt-decode'
import { fromUnixTime, isFuture } from 'date-fns'

const validateAuth = (token: string): boolean => {
  if (!token || token === '') {
    return false
  }
  const { exp } = jwtDecode(token)
  const expDate = fromUnixTime(exp)

  return isFuture(expDate)
}

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const [token] = useLocalStorage('token')
  const isAutheticated = validateAuth(token)

  return (
    <Route
      {...rest}
      render={() => (isAutheticated ? children : <Redirect to="/login" />)}
    />
  )
}

export default PrivateRoute
