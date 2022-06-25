import { createStore, combineReducers, applyMiddleware } from "redux";
import {auth} from '../store/reducers/auth';
import { games } from "./reducers/games";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: auth,
    games: games
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));