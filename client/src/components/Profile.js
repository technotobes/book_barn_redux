import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Profile() {

    const [user, setUser]=useState([])
    const token = localStorage.getItem('jsonwebtoken')

    const fetchProfile = (username) => {
        fetch(`http://localhost:8080/profile/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(user => {
            setUser(user)
            console.log(user)

        })
      }

    useEffect(() => {
        fetchProfile(localStorage.getItem('username'))
    }, [])


    return(
        <div>
            <h1>User Profile</h1>
            <p>{user.username}</p>
            <p>{user.email}
            <NavLink to={`/profile/${user.username}/edit-email`}>Edit</NavLink></p>
        </div>
    )
}

export default Profile