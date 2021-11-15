import { LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from '../constants'

export const registerAction = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user
  }
}

export const registerFail = () => {
  return {
    type: REGISTER_FAIL
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