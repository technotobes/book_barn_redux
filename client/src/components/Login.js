import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function Login(props) {

    const [user, setUser] = useState({})

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const navigate = useNavigate()

    const handleLoginUser = () => {
        fetch('http://localhost:8080/login2', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user) 
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                // save the token in the local storage
                const token = result.token
                localStorage.setItem('jsonwebtoken', token)
                localStorage.setItem('username', user.username)
                props.onLogin()
                navigate("/")

            } else {
                // display error message
                console.log("Authentication Failed")
            }

        })
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" onChange={handleTextChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleTextChange}/>
            <button onClick={handleLoginUser}>Login</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch(actionCreators.login())
    }
}

export default connect(null, mapDispatchToProps)(Login)