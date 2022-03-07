import React, { useState, useEffect } from 'react'
import BookList from './components/BookList'
import { connect } from 'react-redux'
import * as actionCreators from './store/creators/actionCreators'

function App(props) {
  const [books, setBooks] = useState([])

  useEffect(()=> {
    props.onFetchBooks()
  }, [])

  const fetchAllBooks = () => {
    props.onFetchBooks()
  }

  const handleFilterBooks = (e) => {
    props.onFetchFilteredBooks(e.target.value)
  }

  return(
    <div>
      <BookList books={books} onBookDeleted={() => fetchAllBooks()} onFilterBooks={() => handleFilterBooks} onFetchBooks={() => fetchAllBooks()}/>
    </div>
  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBooks: () => dispatch(actionCreators.fetchBooks()),
    onFetchFilteredBooks: (genre) => dispatch(actionCreators.fetchfilteredBooks(genre))
  }
}


export default connect(null, mapDispatchToProps)(App);

// class App extends Component {

//   constructor() {
//     super()

//     this.state={
//       books:[],
//     }
//   }



//   render() {
//     return(
//       <div>
//         <BookList books={this.state.books} onBookDeleted={this.handleOnBookDeleted} />
//       </div>
//     )
//   }

  
//   handleOnBookDeleted = () => {
//     console.log('Hello World')
//     this.fetchAllBooks()
//   }

//   fetchAllBooks = () => {
//     fetch('http://localhost:8080/books')
//     .then(response => response.json())
//     .then(books => {
//       // put the books in the state 
//       // State cannot be changed, it can only be replaced 
//       //this.state.books = books // DO NOT DO THIS 
//       this.setState({
//         books: books 
//       })
//     })
//   }

//   componentDidMount() {
//     this.fetchAllBooks()
//   }
// }