import * as actionTypes from '../actions/actionTypes'

export const login = () => {
    return {
        type: actionTypes.LOG_IN
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}

export const addToCart = (book) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: book
    }
}

export const addToFavorites = (book) => {
    return {
        type: actionTypes.ADD_TO_FAVORITES,
        payload: book
    }
}