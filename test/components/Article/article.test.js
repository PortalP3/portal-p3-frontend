import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Article from '../../../src/components/Article/Article'
import reducers from '../../../redux/reducers/Reducers'

const article1 = {
  id: '1',
  date: '2018-02-02T14:19:11',
  modified: '2018-02-04T14:19:11',
  title: {
    rendered: 'title1'
  },
  content: {
    rendered: 'excerpt1'
  }
}

const article2 = {
  id: '2',
  date: '2018-02-02T14:19:11',
  modified: '2018-02-04T14:19:11',
  title: {
    rendered: 'title2'
  },
  content: {
    rendered: 'excerpt2'
  }
}

const authorInfo = {
  data: [{
    name: 'AuthorTest'
  }]
}

const articles = [article1, article2]

const wordpressClient = {
  getAuthorInfo: (author) => {
    return Promise.resolve(authorInfo)
  }
}

const store = createStore(reducers)
let wrapper

beforeEach(() => {
  store.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles})
  store.dispatch({type: 'ARTICLE_SET_CONTENT', payload: article1})

  wrapper = mount(<Provider store={store}><Article wordpressClient={wordpressClient} /></Provider>)
})

test('render outer div for article', () => {
  expect(wrapper.find('.article-container').find('.article')).toHaveLength(1)
})

test('render title for article', () => {
  expect(wrapper.find('.article-container').find('.article').find('h1').text()).toEqual('title1')
})

test('render article meta', () => {
  let articleMeta = wrapper.find('.article-container').find('.article').find('.article-meta')
  expect(articleMeta.find('span').at(0).text()).toEqual('Fecha de creación: 2/2/2018')
  expect(articleMeta.find('span').at(1).text()).toEqual('Fecha de modificación: 4/2/2018')
  expect(articleMeta.find('span').at(2).text()).toEqual('Autor: AuthorTest')
})

test('render article html content', () => {
  let articleContent = wrapper.find('.article-container').find('.article')
  expect(articleContent.text()).toMatch(/excerpt1/)
})
