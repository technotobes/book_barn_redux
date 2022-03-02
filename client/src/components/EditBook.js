import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function EditBook() {
    const [book, setBook] = useState({})

    const {id} = useParams()
    const navigate = useNavigate()

    const handleTextChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
            username: localStorage.getItem('username')
        })
    }

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
        .then(response => response.json())
        .then(book => {  
            setBook(book)
        })
    }, [])

    const handleSaveBook = () => {
        fetch(`http://localhost:8080/edit-book/${id}/update`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(book) 
        }).then(response => response.json())
        .then(result => {
            // this.props.onBookAdded is going to call
            // onBookAdded function in the parent which is App.js
            console.log(result)
            navigate("/")
        })
    }

    return (
        <div>
            <h1>Edit Book</h1>
            <input type = "text" value={book.title} name="title" onChange={handleTextChange}/>
            <input type = "text" value={book.genre} name="genre" onChange={handleTextChange}/>
            <input type = "text" value={book.publisher} name="publisher" onChange={handleTextChange}/>
            <input type = "text" value={book.year} name="year" onChange={handleTextChange}/>
            <input type = "text" value={book.imageURL} name="imageURL" onChange={handleTextChange}/>
            <button onClick = {() => handleSaveBook(book)}>Save</button>
        </div>
    )
}


export default EditBook

// class EditBook extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             title:'',
//             genre:'',
//             publisher:'',
//             year:'',
//             imageURL:'',
//         }
//     }

//     componentDidMount() {
//         fetch(`http://localhost:8080/edit-book/${this.props.params.id}`)
//         .then(response => response.json())
//         .then(book => {
//           // put the books in the state 
//           // State cannot be changed, it can only be replaced 
//           //this.state.books = books // DO NOT DO THIS 
//           this.setState({
//             title:(book.title),
//             genre:(book.genre),
//             publisher:(book.publisher),
//             year:(book.year),
//             imageURL:(book.imageURL),
//           })
//         })
//     }

//     handleUpdateBook = (id) => {
//         fetch(`http://localhost:8080/edit-book/${id}/update`, {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json'
//             }, 
//             body: JSON.stringify(this.state) 
//         }).then(response => response.json())
//         .then(result => {
//             // this.props.onBookAdded is going to call
//             // onBookAdded function in the parent which is App.js
//             this.props.onBookAdded()
//         })
//     }

    
//     handleTextUpdate = (e) => {
//        this.setState({
//            [e.target.name]: e.target.value 
//        })
//     } 


//     render() {
//         return (
//             <div>
//                 <h1>Edit Book</h1>
//                 <input type = "text" value={this.state.title} name="title" onChange={this.handleTextUpdate}/>
//                 <input type = "text" value={this.state.genre} name="genre" onChange={this.handleTextUpdate}/>
//                 <input type = "text" value={this.state.publisher} name="publisher" onChange={this.handleTextUpdate}/>
//                 <input type = "text" value={this.state.year} name="year" onChange={this.handleTextUpdate}/>
//                 <input type = "text" value={this.state.imageURL} name="imageURL" onChange={this.handleTextUpdate}/>
//                 <button onClick={() => this.handleUpdateBook(this.props.params.id)}>Update Book</button>
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