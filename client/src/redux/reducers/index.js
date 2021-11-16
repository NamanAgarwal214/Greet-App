import {combineReducers} from "redux"
import AuthReducer from "./authReducer"
import AlertReducer from "./alertReducer"

export const rootReducer = combineReducers({
  Auth: AuthReducer,
  Alert: AlertReducer
})