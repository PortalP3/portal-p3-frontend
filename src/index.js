import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import reducers from '../redux/Reducers/Reducers'
import App from './components/App/App'

const root = document.getElementById("root");

ReactDom.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>
  , root)
