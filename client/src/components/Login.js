import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleUserLogin = () => {
        localStorage.setItem('username', user.username)
        navigate("/")
    }

    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" onChange={handleTextChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleTextChange}/>
            <button onClick={handleUserLogin}>Login</button>
        </div>
    )
}

export default Login