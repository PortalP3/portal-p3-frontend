import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { APP_NAME } from '../../config/constants'

import './navigationBar.scss'


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
        <Nav>
          <NavDropdown title={APP_NAME} id="0">
            <MenuItem  href="/">INICIO</MenuItem>
            <MenuItem divider />
            {this.displayItems()}
          </NavDropdown>
        </Nav>
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