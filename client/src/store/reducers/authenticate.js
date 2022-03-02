import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                isAuthenticated: true
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default reducer