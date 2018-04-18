import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
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

const store = createStore(reducers)

const error = {
  data: [], errorMessage: "Network error"
}

const wordpressClient = {
  getCategories: () => {
    return Promise.resolve(error)
  }
}



test("home component handles error response", (done)=>{

  let errorIsSet = false
  function testExpect() {      
    expect(errorIsSet).toBeTruthy()
    done()
  }
  function errorCallBack(state, title, message) {
    errorIsSet = state
    testExpect(); 
  }

  mount(
    <Provider store={store}>
      <Home onError={errorCallBack} wordpressClient={wordpressClient} />
    </Provider>) 
})


test("makes request to api and shows error(calling from article container component)", (done)=>{

  store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
  let errorIsSet = false
  function testExpect() {      
    expect(errorIsSet).toBeTruthy()
    done()
  }
  function errorCallBack(state, title, message) {
    errorIsSet = state
    testExpect(); 
  }

  mount(
    <Provider store={store}>
      <ArticleContainer categoryId={1} onError={errorCallBack} wordpressClient={wordpressClient} />
    </Provider>) 
})
/*
test("makes request to api and shows error(calling from article component)", ()=>{
  let errorIsSet = false
  function testExpect() {      
    expect(errorIsSet).toBeTruthy()
    done()
  }
  function errorCallBack(state, title, message) {
    errorIsSet = state
    testExpect(); 
  }

  mount(
    <Provider store={store}>
      <Article onError={errorCallBack} wordpressClient={wordpressClient} />
    </Provider>) 
})*/