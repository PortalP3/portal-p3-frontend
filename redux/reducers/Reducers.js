import {combineReducers} from 'redux'

import HeaderReducer from './header/HeaderReducer'
import CategoryReducer from './category/CategoryReducer'
import ArticleReducer from './article/ArticleReducer'
import NotificationsReducer from './notifications/NotificationsReducer'

const reducers = combineReducers({
  header: HeaderReducer,
  category: CategoryReducer,
  article: ArticleReducer,
  notifications: NotificationsReducer
})

export default reducers
