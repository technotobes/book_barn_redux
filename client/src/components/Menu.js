
import React from 'react'
import { NavLink } from 'react-router-dom'
import CartCountDisplay from './CartCountDisplay'
import { connect } from 'react-redux'
import Logout from './Logout'

function Menu(props) {

  return (
    <div>
        <div><NavLink to="/">Home</NavLink> </div>
        <div><NavLink to="/add-book">Add Book</NavLink></div>
        <div><NavLink to="/register">Register</NavLink></div>
        {!props.isAuthenticated ? <div><NavLink to="/login">Login</NavLink></div> : <div><Logout /></div>}
        <div><NavLink to="/favorites">Favorite Books</NavLink></div>
        <div><NavLink to="/my-books">My Books</NavLink></div>
        <div><NavLink to="/cart">Cart<CartCountDisplay /></NavLink></div>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Menu)


// class Menu extends Component {
//     render() {

//           return (
//             <div>
//                 <div><NavLink to="/">Home</NavLink> </div>
//                 <div><NavLink to="/add-book">Add Book</NavLink></div>
//                 <div><NavLink to="/register">Register</NavLink></div>
//                 {!this.props.isAuthenticated ? <div><NavLink to="/login">Login</NavLink></div> : <div><Logout /></div>}
//                 <div><NavLink to="/my-books">My Books</NavLink></div>
//                 <div><NavLink to="/cart">Cart<CartCountDisplay /></NavLink></div>

//             </div>
//           )
//     }
// }