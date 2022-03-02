import * as actionTypes from '../actions/actionTypes'

const initialState = {
    favorites: [],

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state
    }
}

export default reducer