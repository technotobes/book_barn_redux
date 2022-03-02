import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function BookList(props) {

    const deleteBook = (id) => {
        fetch(`http://localhost:8080/delete/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(result => {
            props.onBookDeleted()
        })
    }

    const bookItems = props.books.map(book => {
        return <li key = {book.id}>
            {book.title}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
            <button onClick={() => props.onAddToCart(book)}>Add to Cart</button>
            <button onClick={() => props.onAddToFavorites(book)}>Add To Favorites</button>
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


const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (book) => dispatch(actionCreators.addToCart(book)),
        onAddToFavorites: (book) => dispatch(actionCreators.addToFavorites(book))
    }
}

export default connect(null, mapDispatchToProps)(BookList) 

// class BookList extends Component {

//     deleteBook = (id) => {
//         fetch(`http://localhost:8080/delete/${id}`, {
//             method: 'DELETE'
//         }).then(response => response.json())
//         .then(result => {
//             this.props.onBookDeleted()
//         })
//     }



//     render() {
//         const bookItems = this.props.books.map(book => {
//             return <li key = {book.id}>
//                 {book.title}
//                 <button onClick={() => this.deleteBook(book.id)}>Delete</button>
//                 <button onClick={() => this.props.onAddToCart(book)}>Add to Cart</button>
//                 <div><NavLink to={"/book/" + book.id}>Details</NavLink></div>
//                 <div><NavLink to={"/edit-book/" + book.id}>Edit</NavLink></div>
//             </li>
//           })
      
//           return (
//             <div>
//               <h1>Books</h1>
//               {bookItems}
//             </div>
//           )

//         }
        
//     }