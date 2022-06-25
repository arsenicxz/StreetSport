import { SIGNIN, LOGOUT } from "../actions/auth"

const initialState = {
    userID: null,
    username: null,
    login: null
}

export const auth = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return {
                userID: action.userID,
                username: action.username,
                login: action.login
            }
        case LOGOUT:
            return{
                userID: null,
                username: null,
                login: null
            }
        default: return state
    }
}