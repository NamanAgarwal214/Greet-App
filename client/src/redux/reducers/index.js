import {combineReducers} from "redux"
import AuthReducer from "./authReducer"
import AlertReducer from "./alertReducer"
import EventReducer from "./eventReducer"

export const rootReducer = combineReducers({
  Auth: AuthReducer,
  Alert: AlertReducer,
  Event: EventReducer
})