import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WordpressClient from '../../clients/WordpressClient';

import './rating.scss'

export default class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: this.props.articleMeta.rating,
      votes: this.props.articleMeta.votes
    }
  }

  sendVote() {
    this.props.wordpressClient.ratePost(this.props.articleId, this.state.rating).then(result => {
      this.setState({rating: result.data.rating})
    })
  }

  render() {
    return (
      <div className="rating">
        <span>Rating {this.props.articleMeta.rating}</span>
        <span>Votos {this.props.articleMeta.votes}</span>

        <input 
          type="text" 
          onChange={(value) => {
            this.setState({rating: value.target.value})
          }}
        />

        <input type="button" onClick={() => this.sendVote()} />
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