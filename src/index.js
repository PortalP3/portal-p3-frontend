import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducers from '../redux/reducers/Reducers'
import App from './components/App/App'

const root = document.getElementById("root");

ReactDom.render(
  <Provider store={createStore(reducers, applyMiddleware(logger))}>
    <App />
  </Provider>
  ,
root)
