import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import ArticleContainer from '../Article/ArticleContainer'
import Article from '../Article/Article'
import PageNotFound from '../PageNotFound/PageNotFound'

import './main.scss'

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/category/:categoryId?"
        render={(props) => <ArticleContainer categoryId={parseInt(props.match.params.categoryId)} />}
      />
      <Route
        exact
        path="/category/:categoryId?/article/:articleId?"
        render={(props) => <Article categoryId={parseInt(props.match.params.categoryId)} articleId={parseInt(props.match.params.articleId)} />}
      />
      <Route component={PageNotFound} />
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
