import React from 'react'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'

import './app.scss'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
      <NavigationBar />
    </div>
  )
}

export default App
