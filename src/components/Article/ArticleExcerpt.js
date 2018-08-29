import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './articleExcerpt.scss'

const ArticleExcerpt = (props) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="article-excerpt col-md-6 col-sm-12">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img alt="" src="/assets/images/noimage.png" className="" />
        </div>
        <div className="col-md-8 col-sm-12">
          <Link
            to={`/category/${props.categoryId}/article/${props.id}`}
            onClick={() => props.dispatch({type: 'ARTICLE_SET_CONTENT', payload: findArticleById(props.id, props.articles)})}
          >
            <h2 className="article-title">{props.title}</h2>
          </Link>
          <div className="article-date">
            {new Date(props.date).toLocaleString('es-CL', options)} 
          </div>
          <div className="article-author">Por {props.authorName}</div>
          {renderHTML(props.excerpt)}
        </div>
      </div>
    </div>
  )
}

const findArticleById = (id, articles) => {
  return articles.filter(article => article.id === id)[0]
}

ArticleExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  authorName: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  articles: store.category.articles
}))(ArticleExcerpt)
