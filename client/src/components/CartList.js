import { connect } from 'react-redux'

function CartList(props) {

    const cartItems = props.allCartItems.map((book, index)=> {
        return <li key={index}>{book.title}</li>
    })
    console.log(props.allCartItems)


    return (
        <div>
            <h1>Items in Cart</h1>
            {cartItems}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        allCartItems: state.cartRed.cart
    }
}

export default connect(mapStateToProps)(CartList)