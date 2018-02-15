import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ArticleExcerpt from './ArticleExcerpt'
import CategoryContainer from '../Category/CategoryContainer'

import WordpressClient from '../../clients/WordpressClient'

import '../Category/categoryContainer.scss'
import './articleContainer.scss'

class ArticleContainer extends Component {

  constructor(props) {
    super(props)

    this.wordpressClient = this.props.wordpressClient
  }

  async componentDidMount() {
    await this.loadCategory(this.props.categoryId)
  }

  async componentWillReceiveProps(nextProps) {
    if(this.props.categoryId !== nextProps.categoryId) {
      await this.loadCategory(nextProps.categoryId)
    }
  }

  async loadCategory(categoryId) {
    this.props.dispatch({type: 'HEADER_SET_TITLE', payload: this.findCategoryNameById(categoryId)})
    await this.wordpressClient.getArticlesByCategory(categoryId).then((articles) => {
      this.props.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
    })
  }

  findCategoryNameById(categoryId) {
    return this.props.categories.filter(category => category.id === categoryId)[0].name
  }

  render() {
    return (
      <div className="article-container">
        {this.props.articles.map(article => (
          <ArticleExcerpt
            key={article.id}
            id={article.id}
            title={article.title.rendered}
            excerpt={article.excerpt.rendered}
            authorId={article.author}
          />
        ))}

        <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} />
      </div>
    )
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
}

export default connect(store => ({
  articles: store.category.articles,
  categories: store.category.categories
}))(ArticleContainer)
