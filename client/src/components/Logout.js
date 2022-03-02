
import { connect } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as actionCreators from '../store/creators/actionCreators'

function Logout(props) {

    const navigate = useNavigate()

    const handleUserLogout = (props) => {
        localStorage.setItem('username', null)
        props.onLogout()
        navigate("/")
    }

    return(
        <div>
            <button onClick={() => handleUserLogout(props)}>Logout</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)