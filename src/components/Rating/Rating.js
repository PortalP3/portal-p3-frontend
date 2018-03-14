import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WordpressClient from '../../clients/WordpressClient';

import Star from './Star'

import './rating.scss'

export default class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: parseFloat(this.getValueFromProp(this.props.articleMeta.rating)),
      votes: parseInt(this.getValueFromProp(this.props.articleMeta.votes))
    }

    this.sendVote = this.sendVote.bind(this)

    this.stars = [1, 2, 3, 4, 5]
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.articleId !== nextProps.articleId) {
      this.setState({
        rating: parseFloat(this.getValueFromProp(nextProps.articleMeta.rating)),
        votes: parseInt(this.getValueFromProp(nextProps.articleMeta.votes))
      })
    }
  }

  getValueFromProp(value) {
    return value ? value[0] : 0
  }

  async sendVote(value) {
    let result = await this.props.wordpressClient.ratePost(this.props.articleId, value.target.value)

    this.setState({
      rating: parseFloat(result.data.rating),
      votes: result.data.votes,
    })
  }

  render() {
    return (
      <div className="rating">
        <h3>¿Qué te pareció el artículo?</h3>
        <div className="stars">
          {this.stars.map(star => (
            <Star key={star} value={star} onClick={this.sendVote} rating={this.state.rating} />
          ))}
        </div>
      </div>
    )
  }
}

Rating.propTypes = {
  articleMeta: PropTypes.shape().isRequired,
  articleId: PropTypes.number.isRequired,
  wordpressClient: PropTypes.shape().isRequired
}

Rating.defaultProps = {
  wordpressClient: new WordpressClient()
}