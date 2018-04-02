import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { SHOW_NOTIFICATION } from '../../../redux/actions/actionTypes'
import WordpressClient from '../../clients/WordpressClient';
import * as Messages from '../../utilities/_messages';

import Star from './Star'

import './rating.scss'

class Rating extends Component {
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
    let empty = 0
    this.setState({
      rating: parseFloat(result.data.rating),
      votes: result.data.votes,
    })
    if (result.data.error.length > empty) {
      this.props.dispatch({type: SHOW_NOTIFICATION, payload: Messages.NOTIFICATION_VOTED_ARTICLE_ERROR})
    }else{
      this.props.dispatch({type: SHOW_NOTIFICATION, payload: Messages.NOTIFICATION_VOTED_ARTICLE_SUCCESS})
    }
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
  wordpressClient: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired
}

Rating.defaultProps = {
  wordpressClient: new WordpressClient()
}


export default connect(store => ({
  notifications: store.notifications,
}))(Rating)