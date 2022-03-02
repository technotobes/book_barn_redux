import { connect } from 'react-redux'

function FavoritesList(props) {

    const favItems = props.allFavItems.map((book, index)=> {
        return <li key={index}>{book.title}</li>
    })
    console.log(props.allFavItems)


    return (
        <div>
            <h1>Favorite Books</h1>
            {favItems}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        allFavItems: state.favoritesRed.favorites
    }
}

export default connect(mapStateToProps)(FavoritesList)