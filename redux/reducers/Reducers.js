import {combineReducers} from 'redux'

import HeaderReducer from './header/HeaderReducer'
import CategoryReducer from './category/CategoryReducer'

const reducers = combineReducers({
  header: HeaderReducer,
  category: CategoryReducer
})

export default reducers
