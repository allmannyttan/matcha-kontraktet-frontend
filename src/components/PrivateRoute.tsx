import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { validateAuth } from '../utils/auth'
import { connect } from 'react-redux'
import { SystemState } from '../store/system/types'
import { State } from '../store/types'

interface PrivateRouteProps extends RouteProps {
  system: SystemState
}

const PrivateRoute = ({ children, system, ...rest }: PrivateRouteProps) => {
  const isAutheticated = validateAuth(system.token)

  return (
    <Route
      {...rest}
      render={() => (isAutheticated ? children : <Redirect to="/login" />)}
    />
  )
}

const mapStateToProps = (state: State) => ({ system: state.system })

export default connect(mapStateToProps)(PrivateRoute)
