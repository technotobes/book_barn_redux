import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class BookList extends Component {

    deleteBook = (id) => {
        fetch(`http://localhost:8080/delete/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(result => {
            this.props.onBookDeleted()
        })
    }



    render() {
        const bookItems = this.props.books.map(book => {
            return <li key = {book.id}>
                {book.title}
                <button onClick={() => this.deleteBook(book.id)}>Delete</button>
                <div><NavLink to={"/book/" + book.id}>Details</NavLink></div>
                <div><NavLink to={"/edit-book/" + book.id}>Edit</NavLink></div>
            </li>
          })
      
          return (
            <div>
              <h1>Books</h1>
              {bookItems}
            </div>
          )
    }
}

export default BookList 