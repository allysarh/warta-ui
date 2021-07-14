import { combineReducers } from "redux";
import { authReducer } from "./authReducer"
import { NewsReducer } from './newsReducer'

export const Reducers = combineReducers({
    authReducer,
    NewsReducer
})