import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function Login(props) {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleUserLogin = (props) => {
        localStorage.setItem('username', user.username)
        props.onLogin()
        navigate("/")
    }

    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" onChange={handleTextChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleTextChange}/>
            <button onClick={() => handleUserLogin(props)}>Login</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch(actionCreators.login())
    }
}

export default connect(null, mapDispatchToProps)(Login)