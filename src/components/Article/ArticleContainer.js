import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ArticleExcerpt from './ArticleExcerpt'
import CategoryContainer from '../Category/CategoryContainer'
import Loading from '../Loading/Loading'

import WordpressClient from '../../clients/WordpressClient'

import '../Category/categoryContainer.scss'
import './articleContainer.scss'

class ArticleContainer extends Component {

  componentWillMount() {
    if(this.isDifferentCategory()) {
      this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
    }
  }

  async componentDidMount() {
    if(this.isDifferentCategory()) {
      await this.loadCategory(this.props.categoryId)
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(this.props.categoryId !== nextProps.categoryId) {
      this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
      await this.loadCategory(nextProps.categoryId)
    }
  }

  isDifferentCategory() {
    if(this.props.currentCategory !== this.props.categoryId) return true
    return false
  }

  async loadCategory(categoryId) {
    if(this.props.categories.length === 0) {
      let categories = await this.props.wordpressClient.getCategories()
      this.dispatchWrapper({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
    }
    if(this.categoryExists(categoryId)){
      this.dispatchWrapper({type: 'HEADER_SET_TITLE', payload: this.findCategoryNameById(categoryId)})
      let articles = await this.props.wordpressClient.getArticlesByCategory(categoryId)
      this.dispatchWrapper({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
      this.props.dispatch({type: 'CATEGORY_SET_CURRENT_ID', payload: categoryId})
    }else{
      window.location = "/NotFound"
    }
  }

  dispatchWrapper(action) {
    this.props.dispatch(action)
  }

  categoryExists(categoryId){
    return this.props.categories.filter(category => category.id === categoryId).length!==0
  }

  findCategoryNameById(categoryId) {
    return this.props.categories.filter(category => category.id === categoryId)[0].name
  }

  render() {
    if(this.props.articles.length === 0) {
      return (<Loading />)
    } else {
      return (
        <div className="article-container">
          {this.props.articles.map(article => (
            <ArticleExcerpt
              key={article.id}
              id={article.id}
              title={article.title.rendered}
              excerpt={article.excerpt.rendered}
              authorId={article.author}
              categoryId={this.props.categoryId}
            />
          ))}

          <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} />
        </div>
    )}
  }
}

ArticleContainer.defaultProps = {
  wordpressClient: new WordpressClient()
}

ArticleContainer.propTypes = {
  wordpressClient: PropTypes.shape(),
  categoryId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentCategory: PropTypes.number.isRequired
}

export default connect(store => ({
  articles: store.category.articles,
  categories: store.category.categories,
  currentCategory: store.category.categoryId
}))(ArticleContainer)
