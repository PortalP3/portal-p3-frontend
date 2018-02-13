import {combineReducers} from 'redux'

import HeaderReducer from './header/HeaderReducer'
import CategoryReducer from './category/CategoryReducer'
import ArticleReducer from './article/ArticleReducer'

const reducers = combineReducers({
  header: HeaderReducer,
  category: CategoryReducer,
  article: ArticleReducer
})

export default reducers
