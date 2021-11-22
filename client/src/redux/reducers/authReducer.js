import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT, AUTH_FAIL } from '../constants'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? {
	loggedIn: false,
	user: JSON.parse(localStorage.getItem('user'))
} : {}

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
				...action.payload,
				loggedIn: true
      }
		case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
			return {
				...state,
				...action.payload,
				loggedIn: true
			}
    case AUTH_FAIL: 
      return {}
    case LOGOUT:
		// localStorage.removeItem('user')
      return {
		//   ...state,
		//   loggedIn: false
	  }
	default:
		return state
	}
}
