import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './articleExcerpt.scss'

const ArticleExcerpt = (props) => (
  <div className="article-excerpt">
    <Link
      to={`/category/${props.categoryId}/article/${props.id}`}
      onClick={() => props.dispatch({type: 'ARTICLE_SET_CONTENT', payload: findArticleById(props.id, props.articles)})}
    >
      <h2>{props.title}</h2>
    </Link>
    {renderHTML(props.excerpt)}
  </div>
)

const findArticleById = (id, articles) => {
  return articles.filter(article => article.id === id)[0]
}

ArticleExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  articles: store.category.articles
}))(ArticleExcerpt)
