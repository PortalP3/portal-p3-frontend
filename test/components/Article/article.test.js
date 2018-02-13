import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Article from '../../../src/components/Article/Article'
import reducers from '../../../redux/reducers/Reducers'

const articles = [
  {
    id: '1',
    title: {
      rendered: 'title1'
    },
    content: {
      rendered: 'excerpt1'
    }
  },
  {
    id: '2',
    title: {
      rendered: 'title2'
    },
    content: {
      rendered: 'excerpt2'
    }
  }
]

const store = createStore(reducers)
let wrapper

beforeEach(() => {
  store.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles})
  store.dispatch({type: 'CATEGORY_SET_ARTICLE_CONTENT', payload: '1'})

  wrapper = mount(<Provider store={store}><Article /></Provider>)
})

test('render outer div for article', () => {
  expect(wrapper.find('.article')).toHaveLength(1)
})
