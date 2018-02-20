import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import CategoryContainer from '../Category/CategoryContainer'
import ArticleNavigation from './ArticleNavigation'

import WordpressClient from '../../clients/WordpressClient'

import './articleContainer.scss'
import './article.scss'
import '../Category/categoryContainer.scss'

class Article extends Component {

  componentDidMount() {
    this.props.wordpressClient.getAuthorInfo(this.props.content.author).then(author => {
      this.props.dispatch({type: 'ARTICLE_SET_AUTHOR', payload: author.data[0].name})
    })
  }

  render() {
    return (<div className="article-container">
      <div className="article">
        <h1>{this.props.content.title.rendered}</h1>
        <div className="article-meta">
          <span>Fecha de creación: {new Date(this.props.content.date).toLocaleDateString('es-ES')}</span>
          <span>Fecha de modificación: {new Date(this.props.content.modified).toLocaleDateString('es-ES')}</span>
          <span>Autor: {this.props.authorName}</span>
        </div>
        {renderHTML(this.props.content.content.rendered)}
      </div>

      <ArticleNavigation categoryId={this.props.categoryId} />

      <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} />
    </div>)
  }

}

Article.defaultProps = {
  wordpressClient: new WordpressClient()
}

Article.propTypes = {
  content: PropTypes.shape().isRequired,
  wordpressClient: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  authorName: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
}

export default connect(store => ({
  authorName: store.article.authorName,
  content: store.article.content,
}))(Article)
