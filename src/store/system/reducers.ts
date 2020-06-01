import { LOGIN, LOGOUT, SystemState, SystemActionTypes } from './types'

const initialState: SystemState = {
  loggedIn: false,
  username: '',
  token: '',
}

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        ...initialState,
      }
    }
    default:
      return state
  }
}
