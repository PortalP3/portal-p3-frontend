import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducers from '../redux/reducers/Reducers'
import App from './components/App/App'

const development = process.env.ENVIRONMENT === 'DEV'
let store

if(development) {
  store = createStore(reducers, applyMiddleware(logger))
} else {
  store = createStore(reducers)
}

const root = document.getElementById("root");

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
root)
