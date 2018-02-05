import React, {Component} from 'react'
import PropTypes from 'prop-types'

import WordpressClient from '../../clients/WordpressClient'

import './app.scss'

export default class App extends Component {

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
    console.log(this.state.categories)

    return (
      <div className="app">
        Hello P3 World!
        <br /><br />
        {this.state.categories.data ? this.state.categories.data[0].name : ''}
      </div>
    );
  }
}

App.defaultProps = {
  wordpressClient: new WordpressClient()
}

App.propTypes = {
  wordpressClient: PropTypes.shape()
}
