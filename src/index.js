import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { BrowserRouter } from 'react-router-dom'

import reducers from '../redux/reducers/Reducers'
import App from './components/App/App'

const root = document.getElementById("root");

ReactDom.render(
  <Provider store={createStore(reducers, applyMiddleware(logger))}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , root)
