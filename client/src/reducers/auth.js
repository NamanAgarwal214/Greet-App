const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null
}

export default function Auth(state = initialState, action) {
	switch (action.type) {
		case 'REGISTER_SUCCESS':
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			}
		case 'REGISTER_FAIL':
		case 'LOGIN_FAIL':
		case 'LOGOUT':
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			}
		default:
			return state
	}
}
