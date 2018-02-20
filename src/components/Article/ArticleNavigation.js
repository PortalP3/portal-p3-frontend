import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './articleNavigation.scss'

const ArticleNavigation = (props) => (
  <div className="article-navigation">
    <div className="back-to-category">
      <Link to={`/category/${props.categoryId}`}>&laquo; Volver a {capitalizeString(props.headerTitle)}</Link>
    </div>

    <div className="previous-next-article">
      {getPreviousArticle(props.categoryId, props.articleId, props.articles, props.dispatch)}
      {getNextArticle(props.categoryId, props.articleId, props.articles, props.dispatch)}
    </div>
  </div>
)

ArticleNavigation.propTypes = {
  categoryId: PropTypes.number.isRequired,
  articleId: PropTypes.number.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired
}

const getPreviousArticle = (categoryId, articleId, articles, dispatch) => {
  let previousArticle = articles[findArticleIndex(articleId, articles) - 1]
  if(previousArticle) {
    return (
      <Link
        to={`/category/${categoryId}/article/${previousArticle.id}`}
        onClick={() => dispatch({type: 'ARTICLE_SET_CONTENT', payload: previousArticle})}
      >
        &laquo; {previousArticle.title.rendered}
      </Link>
    )
  }
}

const getNextArticle = (categoryId, articleId, articles, dispatch) => {
  let nextArticle = articles[findArticleIndex(articleId, articles) + 1]
  if(nextArticle) {
    return (
      <Link
        to={`/category/${categoryId}/article/${nextArticle.id}`}
        onClick={() => dispatch({type: 'ARTICLE_SET_CONTENT', payload: nextArticle})}
      >
        {nextArticle.title.rendered} &raquo;
      </Link>
    )
  }
}

const findArticleIndex = (articleId, articles) => {
  for(let i = 0; i < articles.length; i++) {
    if(articles[i].id === articleId) {
      return i
    }
  }
}

const capitalizeString = (str) => {
  return str ? str[0].toUpperCase() + str.substr(1).toLowerCase() : ''
}

export default connect(store => ({
  headerTitle: store.header.title,
  articles: store.category.articles
}))(ArticleNavigation)
