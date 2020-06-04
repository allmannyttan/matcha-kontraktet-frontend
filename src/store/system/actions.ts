import { Login, LOGIN, LOGOUT } from './types'
import { validateAuth, userName } from '../../utils/auth'

export function login(login: Login) {
  return {
    type: LOGIN,
    payload: {
      loggedIn: validateAuth(login.token),
      username: userName(login.token),
      token: login.token,
    },
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
