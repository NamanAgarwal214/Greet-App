import { LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from '../constants'
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null
}

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			}
		case LOGOUT:
		case REGISTER_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false
			}
		default:
			return state
	}
}
