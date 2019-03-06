import React from 'react'
import {Nav, NavItem } from 'react-bootstrap'

import './navigationMenu.scss'

const NavigationMenu = () => {
    return(
      <Nav>
        <NavItem eventKey={1} href="/">
            Home
        </NavItem>
        <NavItem eventKey={2} href="#">
            Categorías
        </NavItem>
        <NavItem eventKey={2} href="/categories">
            Iniciativas
        </NavItem>
        <NavItem eventKey={2} href="#">
            Nosotros
        </NavItem>
      </Nav>
    )
}

export default NavigationMenu