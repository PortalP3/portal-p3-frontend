import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import {Link} from 'react-router-dom'

import CategoryContainer from '../Category/CategoryContainer'
import ArticleNavigation from './ArticleNavigation'
import Rating from '../Rating/Rating'
import WordpressClient from '../../clients/WordpressClient'
import Loading from '../Loading/Loading'

import './articleContainer.scss'
import './article.scss'
import '../Category/categoryContainer.scss'

class Article extends Component {

  async componentWillMount(){
    if(this.props.categories.length === 0) {
      await this.loadCategory(this.props.categoryId);
    }
  }

  async loadCategory(categoryId) {
    let categories = await this.props.wordpressClient.getCategories()
    this.props.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
    this.props.dispatch({type: 'HEADER_SET_TITLE', payload: this.findCategoryNameById(categories.data, categoryId)})
    let articles = await this.props.wordpressClient.getArticlesByCategory(categoryId)
    this.props.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
    this.props.dispatch({type: 'CATEGORY_SET_CURRENT_ID', payload: categoryId})
    this.props.dispatch({type: 'ARTICLE_SET_CONTENT', payload: articles.data.filter(article => article.id === this.props.articleId)[0]})
  }

  findCategoryNameById(categories, categoryId) {
    return categories.filter(category => category.id === categoryId)[0].name
  }

  capitalizeString(str) {
    return str ? str[0].toUpperCase() + str.substr(1).toLowerCase() : ''
  }

  render() {
    if(Object.keys(this.props.content).length === 0 && this.props.content.constructor === Object) {
      return (<Loading />)
    } else {
      return (
        <div className="article-container">
          <div className="article">

            <div className="back-to-category">
              <Link to={`/category/${this.props.categoryId}`}>&laquo; Volver a {this.capitalizeString(this.props.headerTitle)}</Link>
            </div>

            <h1>{this.props.content.title.rendered}</h1>
            <div className="article-meta">
              <span>Fecha de creación: {new Date(this.props.content.date).toLocaleDateString('es-ES')}</span>
              <span>Fecha de modificación: {new Date(this.props.content.modified).toLocaleDateString('es-ES')}</span>
              <span>Autor: {this.props.content.author_name}</span>
            </div>
            {renderHTML(this.props.content.content.rendered)}

            <Rating articleMeta={this.props.content.post_meta_fields} articleId={this.props.articleId} />

          </div>

          <ArticleNavigation categoryId={this.props.categoryId} articleId={this.props.articleId} />

          <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} />
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
  headerTitle: PropTypes.string.isRequired
}

export default connect(store => ({
  content: store.article.content,
  headerTitle: store.header.title,
  categories: store.category.categories
}))(Article)
