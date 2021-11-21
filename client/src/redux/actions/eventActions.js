import axios from 'axios'
import { GET_EVENT, EVENT_ERROR } from '../constants'

export const addEvent = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const res = await axios.post('/api/friend', formData, config)
		dispatch({
			type: GET_EVENT,
			payload: res.data
		})
		// if(!edit){
		//     history.push('/');
		// }
	} catch (err) {
		// const errors = err.response.data.errors;
		//  if(errors){
		//      errors.forEach(error => {
		//          dispatch(flashMessage({success: false, message: error.msg}));
		//      });
		//  }
		dispatch({
			type: EVENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
		// console.log(err.message)
	}
}
