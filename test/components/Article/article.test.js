import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Article from '../../../src/components/Article/Article'
import reducers from '../../../redux/reducers/Reducers'

const article1 = {
  id: '1',
  title: {
    rendered: 'title1'
  },
  content: {
    rendered: 'excerpt1'
  }
}

const article2 = {
  id: '2',
  title: {
    rendered: 'title2'
  },
  content: {
    rendered: 'excerpt2'
  }
}

const articles = [article1, article2]

const store = createStore(reducers)
let wrapper

beforeEach(() => {
  store.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles})
  store.dispatch({type: 'ARTICLE_SET_CONTENT', payload: article1})

  wrapper = mount(<Provider store={store}><Article /></Provider>)
})

test('render outer div for article', () => {
  expect(wrapper.find('.article')).toHaveLength(1)
})
