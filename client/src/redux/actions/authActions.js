import { LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_FAIL, LOGOUT } from '../constants'

export const registerAction = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user
  }
}

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

export const authFail = () => {
  return {
    type: AUTH_FAIL
  }
}
