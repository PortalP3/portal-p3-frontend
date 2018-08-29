import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './articleExcerpt.scss'

class ArticleExcerpt extends Component {
  constructor(props){
    super(props) 
  }

  getArticle(){
    findArticleById(this.props.id, this.props.articles)
  }

  render() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return (
      <div className="article-excerpt col-md-6 col-sm-12">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img src="/assets/images/noimage.png" className="" alt="noimage" />
          </div>
          <div className="col-md-8 col-sm-12">
            <Link
              to={`/category/${this.props.categoryId}/article/${this.props.id}`}
              onClick={() => this.props.dispatch({type: 'ARTICLE_SET_CONTENT', payload: this.getArticle()})}
            >
              <h2 className="article-title">{this.props.title}</h2>
            </Link>
            <div className="article-date">
              {new Date(this.props.date).toLocaleString('es-CL', options)} 
            </div>
            <div className="article-author">Por {this.props.authorName}</div>
            {renderHTML(this.props.excerpt)}
          </div>
        </div>
      </div>
    )
  }
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
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  authorName: PropTypes.string.isRequired
}

export default connect(store => ({
  articles: store.category.articles
}))(ArticleExcerpt)
