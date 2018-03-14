import React from 'react'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import HomeTab from '../HomeTab/HomeTab'

import './app.scss'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
      <HomeTab />
    </div>
  )
}

export default App
