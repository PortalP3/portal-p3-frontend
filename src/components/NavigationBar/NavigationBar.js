import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { APP_NAME } from '../../config/constants'

class NavigationBar extends Component {

  constructor(props) {
    super(props)
  }
  
  displayItems() {
    return this.props.categories.data.map( 
      (category) => {
      return (
        <MenuItem key={category.id} href={`category/${category.id}`}>{category.name}</MenuItem>
      )
    })
  }

  render() {
    return (
      <Navbar>
        <Nav>
          <NavDropdown title={APP_NAME} id="0">
            {this.displayItems()}
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

NavigationBar.propTypes = {
  categories: PropTypes.shape().isRequired
}

export default NavigationBar