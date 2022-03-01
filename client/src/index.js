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

ReactDOM.render(
  <React.StrictMode>
    
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
          </Routes>
        </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
