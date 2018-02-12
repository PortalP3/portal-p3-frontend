import {combineReducers} from 'redux'

import HeaderReducer from './header/HeaderReducer'

const reducers = combineReducers({
  header: HeaderReducer
})

export default reducers
