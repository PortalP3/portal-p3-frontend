import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html';

import './articleContainer.scss'
import './article.scss'

const Article = props => (
  <div className="article-container">
    <div className="article">
      <h1>{props.content.title.rendered}</h1>
      {renderHTML(props.content.content.rendered)}
    </div>
  </div>
)

Article.propTypes = {
  content: PropTypes.shape().isRequired
}

export default connect(store => ({
  content: store.category.articleContent
}))(Article)
