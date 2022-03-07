import React, { useState, useEffect } from 'react'

function MyBooks() {

    const [books, setBooks]=useState([])
    const token = localStorage.getItem('jsonwebtoken')

    const fetchMyBooks = (username) => {
        fetch(`http://localhost:8080/my-books/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        })
        .then(response => response.json())
        .then(books => {
            setBooks(books)

        })
      }

    useEffect(() => {
        fetchMyBooks(localStorage.getItem('username'))
    }, [])

    const myBookItems = books.map(book => {
        return <li key={book.id}>{book.title}</li>
    })

    return(
        <div>
            <h1>My Books</h1>
            {myBookItems}

        </div>
    )
}

export default MyBooks