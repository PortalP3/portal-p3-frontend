import React, {Component} from 'react'
import PropTypes from 'prop-types'

import WordpressClient from '../../clients/WordpressClient'

import './main.scss'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
    this.wordpressClient = this.props.wordpressClient
  }

  componentDidMount() {
    this.wordpressClient.getCategories().then((categories) => {
      this.setState({categories: categories})
    })
  }

  render() {
    return (
      <div className="main">
        <h1>TEMÁTICAS</h1>
        <br /><br />
        {this.state.categories.data ? this.state.categories.data[0].name : ''}
      </div>
    );
  }
}

Main.defaultProps = {
  wordpressClient: new WordpressClient()
}

Main.propTypes = {
  wordpressClient: PropTypes.shape()
}
