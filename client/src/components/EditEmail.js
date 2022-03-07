import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function EditEmail() {
    const [user, setUser] = useState({})

    const navigate = useNavigate()
    const token = localStorage.getItem('jsonwebtoken')

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const username = localStorage.getItem('username')

    useEffect(() => {
        fetch(`http://localhost:8080/profile/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(user => {  
            setUser(user)
        })
    }, [])

    const handleUpdateEmail = () => {
        fetch(`http://localhost:8080/profile/${username}/edit-email`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }, 
            body: JSON.stringify(user) 
        }).then(response => response.json())
        .then(result => {
            // this.props.onBookAdded is going to call
            // onBookAdded function in the parent which is App.js
            console.log(result)
            navigate(`/profile/${username}`)
        })
    }

    return (
        <div>
            <h1>Edit Email</h1>
            <input type = "text" value={user.email} name="email" onChange={handleTextChange}/>
            <button onClick = {() => handleUpdateEmail(user)}>Save</button>
        </div>
    )
}


export default EditEmail