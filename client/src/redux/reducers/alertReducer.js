import {FLASHMESSAGE, REMOVEFLASHMESSAGE} from '../constants'

const initialState = {
	state: '',
  message: ''
}

export default function AlertReducer(state = initialState, action){
  switch(action.type){
    case FLASHMESSAGE:
      return {...state, ...action.payload}
    case REMOVEFLASHMESSAGE:
      return {}
    default:
      return state
  }
}
