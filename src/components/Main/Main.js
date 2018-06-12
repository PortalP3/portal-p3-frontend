import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import {Route, Switch } from 'react-router-dom'
import {BrowserRouter} from 'react-g-analytics'

import Home from '../Home/Home'
import ArticleContainer from '../Article/ArticleContainer'
import Article from '../Article/Article'
import PageNotFound from '../PageNotFound/PageNotFound'
import InternalError from '../InternalError/InternalError'

import './main.scss'

class Main  extends Component { 

  constructor(props){
    super(props)
    this.state = {
      showError: false,
      title: '',
      message: ''
    }
    this.handleError = this.handleError.bind(this)
  }

  handleError(_state, title, message){
    this.setState({
      showError: _state,
      title: title,
      message: message
    })
  }

  render(){
    if(this.state.showError){
      return(<InternalError title={this.state.title} message={this.state.message} />)
    }else{
      return(<BrowserRouter id={process.env.TRACKING_ID}>
        <Switch>
          <Route exact path="/" render={() => <Home onError={this.handleError} />} />
          <Route
            exact
            path="/category/:categoryId?"
            render={(props) => <ArticleContainer onError={this.handleError} categoryId={parseInt(props.match.params.categoryId)} />}
          />
          <Route
            exact
            path="/category/:categoryId?/article/:articleId?"
            render={(props) => <Article onError={this.handleError} categoryId={parseInt(props.match.params.categoryId)} articleId={parseInt(props.match.params.articleId)} />}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>)
    }
  }
}

/*Main.propTypes = {
  match: PropTypes.shape().isRequired
}*/

Main.defaultProps = {
  match: {}
}

export default Main
