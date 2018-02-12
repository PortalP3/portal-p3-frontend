import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import ArticleContainer from '../Article/ArticleContainer'

import './main.scss'

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/category/:categoryId?" render={(props) => <ArticleContainer categoryId={props.match.params.categoryId} />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
)

Main.propTypes = {
  match: PropTypes.shape().isRequired
}

Main.defaultProps = {
  match: {}
}

export default Main
