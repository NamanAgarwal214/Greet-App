import { LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from '../constants'
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: localStorage.getItem('user')
}

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('user', action.payload.user)
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			}
		case LOGOUT:
		case REGISTER_FAIL:
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			return {
				...state,
				token: null,
				isAuthenticated: false
			}
		default:
			return state
	}
}
