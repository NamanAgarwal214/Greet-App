import { EVENT_ERROR, GET_EVENT } from "../constants"

const initialState = {
    occasion: null,
    occasions: [],
    error: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT:
            return {
                ...state,
                occasions: [action.payload, ...state.occasions]
            }
        case EVENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}