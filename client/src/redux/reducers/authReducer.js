import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from '../constants'
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null
}

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return state
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			}
		case LOGOUT:
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
