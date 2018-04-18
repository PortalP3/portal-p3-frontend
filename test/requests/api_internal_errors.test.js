import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom'
import reducers from '../../redux/reducers/Reducers' 
import Home from '../../src/components/Home/Home'
import ArticleContainer from '../../src/components/Article/ArticleContainer'
import Article from '../../src/components/Article/Article'

const categories = {
  data: [{
    id: 1,
    name: 'category1',
    acf: {
      image: {
        url: 'image1'
      }
    }
  },
  {
    id: 2,
    name: 'category2',
    acf: {
      image: {
        url: 'image2'
      }
    }
  }]
}

const articles = {
  data: [
    {
      id: 1,
      author: 1,
      title: {
        rendered: 'title1'
      },
      excerpt: {
        rendered: 'excerpt1'
      }
    },
    {
      id: 2,
      author: 2,
      title: {
        rendered: 'title2'
      },
      excerpt: {
        rendered: 'excerpt2'
      }
    }
  ]
}

const error = {
  data: [], errorMessage: {message: "Network error"}
}

test("home component handles error response", ()=>{

  const store = createStore(reducers)

  const wordpressClient = {
    getCategories: () => {
      return Promise.resolve(error)
    }
  }

  function errorCallBack(state, title, message) {
    expect(state).toBeTruthy()
    expect(title).toEqual("Error")
    expect(message).toEqual("Network error")
  }

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <Home onError={errorCallBack} wordpressClient={wordpressClient} />
      </MemoryRouter>
    </Provider>) 
})


test("makes request to api and shows error(calling from article container component)", ()=>{

  const store = createStore(reducers)

  const wordpressClient = {
    getCategories: () => {
      return Promise.resolve({data: [], errorMessage: {message: "Network error"}})
    } 
  }

  function errorCallBack(state, title, message) {
    expect(state).toBeTruthy()
    expect(title).toEqual("Error")
    expect(message).toEqual("Network error")
  }

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleContainer categoryId={1} onError={errorCallBack} wordpressClient={wordpressClient} currentCategory={1} />
      </MemoryRouter>
    </Provider>) 
})

test("makes request to api and shows error(calling from article component)", ()=>{

  const store = createStore(reducers)

  const wordpressClient = {
    getCategories: () => {
      return Promise.resolve({data: [], errorMessage: "Network error"})
    },
    getArticlesByCategory: (category) => {
      return Promise.resolve({data: [], errorMessage: "Network error"})
    } 

  }

  function errorCallBack(state, title, message) {
    expect(state).toBeTruthy()
    expect(title).toEqual("Error")
    expect(message).toEqual("Network error")
  }

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <Article onError={errorCallBack} wordpressClient={wordpressClient} categoryId={1} articleId={1} />
      </MemoryRouter>
    </Provider>) 

})

test("makes request to api for articles and shows error(calling from article component)", ()=>{

  const store = createStore(reducers)

  const wordpressClient = {
    getCategories: () => {
      return Promise.resolve(categories)
    },
    getArticlesByCategory: (category) => {
      return Promise.resolve({data: [], errorMessage: "Network error"})
    } 

  }

  function errorCallBack(state, title, message) {
    expect(state).toBeTruthy()
    expect(title).toEqual("Error")
    expect(message).toEqual("Network error")
  }

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <Article onError={errorCallBack} wordpressClient={wordpressClient} categoryId={1} articleId={1} />
      </MemoryRouter>
    </Provider>) 

})