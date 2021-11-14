import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from '../constants'

export const loginAction = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}