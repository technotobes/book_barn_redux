import * as actionTypes from '../actions/actionTypes'

const initialState = {
    books: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.BOOKS_LOADED:
            return {
                ...state,
                books: action.payload
            }
        case actionTypes.FILTERED_BOOKS_LOADED:
            return {
                ...state,
                books: action.payload
            }

        default:
            return state
    }
}

export default reducer