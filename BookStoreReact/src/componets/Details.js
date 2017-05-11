import {Component} from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import {browserHistory} from 'react-router'

@observer
class Details extends Component {

  constructor(props){
    super(props)
  }

  deleteStuff = () =>{
    this.props.bookStore.deleteBook(this.props.id)
    browserHistory.push('/products')
  }

  render() {
    let id = this.props.id
    let book
    try{
    book = this.props.bookStore.getSingleBook(id-1)
      }
    catch(ex){
      this.props.bookStore.fetchBooks()
      return(
        <div>
          <h1>Fetching.....</h1>
        </div>
      )
    }
    return (
      <div>
        <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
        <h4> {book.info}</h4>
        <h4>{book.moreInfo}</h4>
        <br />
        <input type="button" onClick={this.deleteStuff} value="Delete Book"></input>
        <Link to="/products">Products</Link>
      </div>
    );
  }
}

export default Details