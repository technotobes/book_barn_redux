import * as actionTypes from '../actions/actionTypes'

export const fetchBooks = () => {
    return (dispatch) => {
        fetch('http://localhost:8080/books')
        .then(response => response.json())
        .then(books => {
          dispatch({type: actionTypes.BOOKS_LOADED, payload: books})
        })
    }
}

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