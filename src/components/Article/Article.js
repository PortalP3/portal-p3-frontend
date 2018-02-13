import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html';

const Article = props => (
  <div className="article">
    {renderHTML(props.content.content.rendered)}
  </div>
)

Article.propTypes = {
  content: PropTypes.shape().isRequired
}

export default connect(store => ({
  content: store.category.articleContent
}))(Article)
