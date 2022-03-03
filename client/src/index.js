import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import EditBook from './components/EditBook';
import BaseLayout from './components/BaseLayout';
import BookDetail from './components/BookDetail';
import Register from './components/Register';
import Login from './components/Login';
import AddBook from './components/AddBook';
import MyBooks from './components/MyBooks';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import CartList from './components/CartList';
import authenticateReducer from './store/reducers/authenticate'
import cartReducer from './store/reducers/cart'
import bookReducer from './store/reducers/books'
import favoritesReducer from './store/reducers/favorites'
import FavoritesList from './components/FavoritesList';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authenticateRed: authenticateReducer,
  cartRed: cartReducer,
  bookRed: bookReducer,
  favoritesRed: favoritesReducer
  
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
          <BaseLayout>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/my-books" element={<MyBooks />} />
                <Route path="/cart" element={<CartList />} />
                <Route path="/favorites" element={<FavoritesList />} />
            </Routes>
          </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
