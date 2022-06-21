import { createStore, combineReducers, applyMiddleware } from "redux";
import {auth} from '../store/reducers/auth';
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: auth
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));