import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './articleExcerpt.scss'

const ArticleExcerpt = (props) => (
  <div className="article-excerpt">
    <Link to={`/article/${props.id}`} onClick={() => props.dispatch({type: 'CATEGORY_SET_ARTICLE_CONTENT', payload: props.id})}>
      <h2>{props.title}</h2>
    </Link>
    {renderHTML(props.excerpt)}
  </div>
)

ArticleExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(ArticleExcerpt)
