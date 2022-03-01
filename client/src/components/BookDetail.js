import React, { Component } from 'react'
import { useLocation, useNavigate, useParams} from 'react-router-dom'


class BookDetail extends Component {
    constructor(props) {
        super(props)


        this.state={
            book:[],
        }

    }

    componentDidMount() {
        fetch(`http://localhost:8080/book/${this.props.params.id}`)
        .then(response => response.json())
        .then(book => {
          // put the books in the state 
          // State cannot be changed, it can only be replaced 
          //this.state.books = books // DO NOT DO THIS 
          this.setState({
            book: book 
          })
        })
    }


    render() {
        return (
            <div>
                <h1>Book Details</h1>
                <h4>{this.state.book.title}</h4>
            </div>
        )
    }
}

const withRouter = (Component) => (props) => {
    const history = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <Component params={params} history={history} location={location} {...props} />
}

export default withRouter(BookDetail)