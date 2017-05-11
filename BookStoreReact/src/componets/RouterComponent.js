import React from 'react'
import {Component } from 'react'
import Home from './Home'
import Blog from './Blog'
import Product from './Product'
import Details from './Details'
import {observer} from 'mobx-react'
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import NoMatch404 from './NoMatch404'

@observer
class RouterComponent extends Component{

    constructor(props){
        super(props)
    }

    render(){
         var bookStore = this.props.bookStore
        return(
                <HashRouter>
                <div>
                    
                <ul className="header">
                    <li> <Link to="/" selected="activeclass"> Home </Link></li>
                    <li> <Link to="/products"> Products </Link> </li>
                    <li> <Link to="/blog"> Blog </Link> </li>
                </ul>

                    <Route path="/" exact component={Home}></Route>
                    <Route path="/blog"  component={Blog}></Route>
                    <Route exact path="/products"  component={() => (<Product bookStore={bookStore}/>)}></Route>
                    <Route path="/products/details/:id" render={(props) =>( <Details bookStore={bookStore} id={props.match.params.id} />)} ></Route>
                    <Route path="/*" component={NoMatch404}></Route>
                    </div>
                </HashRouter>


        )
    }

}

export default RouterComponent