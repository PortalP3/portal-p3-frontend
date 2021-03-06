import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'

import './navigationBar.scss'
import NavigationMenu from './NavigationMenu';


class NavigationBar extends Component {

  constructor(props) {
    super(props)
  }
  
  displayItems() {
    return this.props.categories.map( 
      (category) => {
      return (
        <MenuItem key={category.id} href={`/category/${category.id}`}>{category.name}</MenuItem>
      )
    })
  }

  render() {
    return (
      <Navbar>
        <img src="/assets/images/logo.png" className="header-logo" alt="logo" />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <NavigationMenu />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

NavigationBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  categories: store.category.categories
}))(NavigationBar)