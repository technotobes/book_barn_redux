import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookDetail() {
    const [book, setBook] = useState({})

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
        .then(response => response.json())
        .then(book => {  
            setBook(book)
        })
    }, [])

    console.log(book)

    return (
        <div>
            <h1>Book Details</h1>
            <h4>{book.title}</h4>
        </div>
    )
}

export default BookDetail


// class BookDetail extends Component {
//     constructor(props) {
//         super(props)


//         this.state={
//             book:[],
//         }

//     }

//     componentDidMount() {
//         fetch(`http://localhost:8080/book/${this.props.params.id}`)
//         .then(response => response.json())
//         .then(book => {
//           // put the books in the state 
//           // State cannot be changed, it can only be replaced 
//           //this.state.books = books // DO NOT DO THIS 
//           this.setState({
//             book: book 
//           })
//         })
//     }


//     render() {
//         return (
//             <div>
//                 <h1>Book Details</h1>
//                 <h4>{this.state.book.title}</h4>
//             </div>
//         )
//     }
// }

// const withRouter = (Component) => (props) => {
//     const history = useNavigate();
//     const location = useLocation();
//     const params = useParams();
//     return <Component params={params} history={history} location={location} {...props} />
// }