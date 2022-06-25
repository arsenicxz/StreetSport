import { GETGAMES } from "../actions/games"

const initialState = {
    games: []
}

export const games = (state = initialState, action) => {
    switch(action.type){
        case GETGAMES:
            return {
                games: action.games
            }
        default: return state
    }
}