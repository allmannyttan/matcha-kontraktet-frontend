export interface SystemState {
  loggedIn: boolean
  username: string
  token: string
}

export interface Login {
  token: string
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

interface LoginAction {
  type: typeof LOGIN
  [payload: string]: any
}

interface LogoutAction {
  type: typeof LOGOUT
}

export type SystemActionTypes = LoginAction | LogoutAction
