import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WordpressClient from '../../clients/WordpressClient';

import Star from './Star'

import './rating.scss'

export default class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: this.props.articleMeta.rating,
      votes: this.props.articleMeta.votes,
      voted: false
    }

    this.sendVote = this.sendVote.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.articleId !== nextProps.articleId) {
      this.setState({
        rating: nextProps.articleMeta.rating,
        votes: nextProps.articleMeta.votes,
        voted: false
      })
    }
  }

  async sendVote(value) {
    let result = await this.props.wordpressClient.ratePost(this.props.articleId, value.target.value)
    this.setState({
      rating: result.data.rating,
      votes: result.data.votes,
      voted: true
    })
  }

  render() {
    return (
      <div className="rating">
        <span>Rating {this.state.rating}</span>
        <span>Votos {this.state.votes}</span>
        <div className="stars">
          <Star id="s1" value="1" voted={this.state.voted} onClick={this.sendVote} rating={this.state.rating} />
          <Star id="s2" value="2" voted={this.state.voted} onClick={this.sendVote} rating={this.state.rating} />
          <Star id="s3" value="3" voted={this.state.voted} onClick={this.sendVote} rating={this.state.rating} />
          <Star id="s4" value="4" voted={this.state.voted} onClick={this.sendVote} rating={this.state.rating} />
          <Star id="s5" value="5" voted={this.state.voted} onClick={this.sendVote} rating={this.state.rating} />
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