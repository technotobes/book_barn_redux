import React, { useState } from 'react'

function AddBook() {
    const [book, setBook] = useState({})

    const handleTextChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
            username: localStorage.getItem('username')
        })
    }

    const handleSaveBook = (state) => {
        fetch('http://localhost:8080/add-book', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(state) 
        }).then(response => response.json())
        .then(result => {
            // this.props.onBookAdded is going to call
            // onBookAdded function in the parent which is App.js
            console.log(result)
        })
    }

    return (
        <div>
            <h1>Add Book</h1>
            <input type = "text" placeholder="Title" name="title" onChange={handleTextChange}/>
            <input type = "text" placeholder="Genre" name="genre" onChange={handleTextChange}/>
            <input type = "text" placeholder="Publisher" name="publisher" onChange={handleTextChange}/>
            <input type = "text" placeholder="Year" name="year" onChange={handleTextChange}/>
            <input type = "text" placeholder="Image URL" name="imageURL" onChange={handleTextChange}/>
            <button onClick = {() => handleSaveBook(book)}>Add Book</button>
        </div>
    )
}


export default AddBook

// USING CLASS COMPONENT
// class AddBook extends Component {
//     constructor() {
//         super()
//         this.state = {
//             title:'',
//             genre:'',
//             publisher:'',
//             year:'',
//             imageURL:'',
//             username: localStorage.getItem('username')
//         }
//     }


//     handleSaveBook = () => {
//         fetch('http://localhost:8080/add-book', {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json'
//             }, 
//             body: JSON.stringify(this.state) 
//         }).then(response => response.json())
//         .then(result => {
//             // this.props.onBookAdded is going to call
//             // onBookAdded function in the parent which is App.js
//             console.log(result)
//         })
//     }
    
//     handleTextUpdate = (e) => {
//        this.setState({
    //            [e.target.name]: e.target.value,
    //        })
//     }
    

//     render() {
//         return (
//             <div>
//                 <h1>Add Book</h1>
//                 <input type = "text" placeholder="Title" name="title" onChange={this.handleTextUpdate}/>
//                 <input type = "text" placeholder="Genre" name="genre" onChange={this.handleTextUpdate}/>
//                 <input type = "text" placeholder="Publisher" name="publisher" onChange={this.handleTextUpdate}/>
//                 <input type = "text" placeholder="Year" name="year" onChange={this.handleTextUpdate}/>
//                 <input type = "text" placeholder="Image URL" name="imageURL" onChange={this.handleTextUpdate}/>
//                 <button onClick = {this.handleSaveBook}>Add Book</button>
//             </div>
//         )
//     }
// }