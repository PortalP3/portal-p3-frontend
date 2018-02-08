import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ArticleExcerpt from './ArticleExcerpt'

import WordpressClient from '../../clients/WordpressClient'

import './articleContainer.scss'

export default class ArticleContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }

    this.wordpressClient = this.props.wordpressClient
  }

  async componentDidMount() {
    this.wordpressClient.getArticlesByCategory(this.props.categoryId).then((articles) => {
      this.setState({articles: articles.data})
    })
  }

  render() {
    return (
      <div className="article-container">
        {this.state.articles.map(article => (
          <ArticleExcerpt key={article.id} title={article.title.rendered} excerpt={article.excerpt.rendered} />
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
  categoryId: PropTypes.number.isRequired
}
