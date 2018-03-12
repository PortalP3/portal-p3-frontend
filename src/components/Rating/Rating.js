import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WordpressClient from '../../clients/WordpressClient';

import Star from './Star'

import './rating.scss'

export default class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: parseFloat(this.props.articleMeta.rating[0]),
      votes: parseInt(this.props.articleMeta.votes[0]),
    }

    this.sendVote = this.sendVote.bind(this)

    this.stars = [1, 2, 3, 4, 5]
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.articleId !== nextProps.articleId) {
      this.setState({
        rating: parseFloat(nextProps.articleMeta.rating[0]),
        votes: parseInt(nextProps.articleMeta.votes[0]),
      })
    }
  }

  async sendVote(value) {
    let result = await this.props.wordpressClient.ratePost(this.props.articleId, value.target.value)
    this.setState({
      rating: parseFloat(result.data.rating[0]),
      votes: parseInt(result.data.votes[0]),
    })
  }

  render() {
    return (
      <div className="rating">
        <span>Rating {this.state.rating}</span>
        <span>Votos {this.state.votes}</span>
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