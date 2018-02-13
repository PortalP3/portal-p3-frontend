import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ArticleExcerpt from './ArticleExcerpt'

import WordpressClient from '../../clients/WordpressClient'

import './articleContainer.scss'

class ArticleContainer extends Component {

  constructor(props) {
    super(props)

    this.wordpressClient = this.props.wordpressClient
  }

  async componentDidMount() {
    this.wordpressClient.getArticlesByCategory(this.props.categoryId).then((articles) => {
      this.props.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
    })
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
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  articles: store.category.articles
}))(ArticleContainer)
