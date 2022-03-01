import React, { Component } from 'react'

class AddBook extends Component {
    constructor() {
        super()
        this.state = {
            title:'',
            genre:'',
            publisher:'',
            year:'',
            imageURL:'',
            username: localStorage.getItem('username')
        }
    }


    handleSaveBook = () => {
        fetch('http://localhost:8080/add-book', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(this.state) 
        }).then(response => response.json())
        .then(result => {
            // this.props.onBookAdded is going to call
            // onBookAdded function in the parent which is App.js
            console.log(result)
        })
    }
    
    handleTextUpdate = (e) => {
       this.setState({
           [e.target.name]: e.target.value,
       })
    }
    
    getUsername = () => {
        const username = localStorage.getItem('username')
        return username
    }



    render() {
        return (
            <div>
                <h1>Add Book</h1>
                <input type = "text" placeholder="Title" name="title" onChange={this.handleTextUpdate}/>
                <input type = "text" placeholder="Genre" name="genre" onChange={this.handleTextUpdate}/>
                <input type = "text" placeholder="Publisher" name="publisher" onChange={this.handleTextUpdate}/>
                <input type = "text" placeholder="Year" name="year" onChange={this.handleTextUpdate}/>
                <input type = "text" placeholder="Image URL" name="imageURL" onChange={this.handleTextUpdate}/>
                <button onClick = {this.handleSaveBook}>Add Book</button>
            </div>
        )
    }
}

export default AddBook