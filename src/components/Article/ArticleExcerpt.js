import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html';

import './articleExcerpt.scss'

const ArticleExcerpt = (props) => (
  <div className="article-excerpt">
    <h2>{props.title}</h2>
    {renderHTML(props.excerpt)}
  </div>
)

ArticleExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired
}

export default ArticleExcerpt
