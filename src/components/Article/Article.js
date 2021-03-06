import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import {Link} from 'react-router-dom'
import moment from 'moment'

import Notifications from '../Notifications/Notifications'
import PageNotFound from '../PageNotFound/PageNotFound'

import CategoryContainer from '../Category/CategoryContainer'
import ArticleNavigation from './ArticleNavigation'
import Rating from '../Rating/Rating'
import WordpressClient from '../../clients/WordpressClient'
import Loading from '../Loading/Loading'
import { HEADER_SET_BACKGROUND } from '../../../redux/actions/actionTypes'

import './articleContainer.scss'
import './article.scss'
import '../Category/categoryContainer.scss'

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articleExists: true
    }
  }

  async componentWillMount(){
    if(this.props.categories.length === 0) {
      await this.loadCategory(this.props.categoryId);
    }
  }

  async loadCategory(categoryId) {
    let categories = await this.props.wordpressClient.getCategories()
    if (categories.errorMessage) {
      this.updateMainComponentState(true, "Error", categories.errorMessage.message)
      return
    }
    this.props.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
    this.props.dispatch({type: 'HEADER_SET_TITLE', payload: this.findCategoryNameById(categories.data, categoryId)})
    this.props.dispatch({type: HEADER_SET_BACKGROUND, payload: this.findCategoryById(categories.data, categoryId).acf.image.url})
    let articles = await this.props.wordpressClient.getArticlesByCategory(categoryId)
    this.props.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
    this.props.dispatch({type: 'CATEGORY_SET_CURRENT_ID', payload: categoryId})
    if(this.articleExists(articles)){
      this.props.dispatch({type: 'ARTICLE_SET_CONTENT', payload: articles.data.filter(article => article.id === this.props.articleId)[0]})
    }
    this.setState({
      articleExists: this.articleExists(articles)
    })
  }

  articleExists(articles){
    return articles.data.filter(article => article.id === this.props.articleId).length !== 0
  }

  findCategoryById(categories, categoryId){
    return categories.filter(category => category.id === categoryId)[0]
  }

  findCategoryNameById(categories, categoryId) {
    return this.findCategoryById(categories, categoryId).name
  }

  capitalizeString(str) {
    return str ? str[0].toUpperCase() + str.substr(1).toLowerCase() : ''
  }

  updateMainComponentState(_state, title, message) {
    this.props.onError(_state, title, message)
  }

  render() {
    if(Object.keys(this.props.content).length === 0 && this.props.content.constructor === Object && this.state.articleExists) {
      return (<Loading />)
    } else if(!this.state.articleExists){
      return (<PageNotFound />)
    }else {
      return (
        <div className="article-container container">
          <div className="article row">

            <div className="back-to-category">
              <Link to={`/category/${this.props.categoryId}`}>&laquo; Volver a {this.capitalizeString(this.props.headerTitle)}</Link>
            </div>

            <h1>{this.props.content.title.rendered}</h1>
            <div className="article-meta">
              <span>Fecha de creación: {moment(this.props.content.date).format('D/M/YYYY')}</span>
              <span>Fecha de modificación: {moment(this.props.content.modified).format('D/M/YYYY')}</span>
              <span>Autor: {this.props.content.author_name}</span>
            </div>
            {renderHTML(this.props.content.content.rendered)}

            <Rating articleMeta={this.props.content.post_meta_fields} articleId={this.props.articleId} />

            <Notifications />

          </div>

          <ArticleNavigation categoryId={this.props.categoryId} articleId={this.props.articleId} />

          <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} onError={()=>{}} />
        </div>
      )
    }
  }

}

Article.defaultProps = {
  wordpressClient: new WordpressClient()
}

Article.propTypes = {
  content: PropTypes.shape().isRequired,
  categoryId: PropTypes.number.isRequired,
  articleId: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  wordpressClient: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired
}

export default connect(store => ({
  content: store.article.content,
  headerTitle: store.header.title,
  categories: store.category.categories
}))(Article)
