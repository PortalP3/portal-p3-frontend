import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import ArticleNavigation from '../../../src/components/Article/ArticleNavigation'
import reducers from '../../../redux/reducers/Reducers'

const store = createStore(reducers)

store.dispatch({type: 'HEADER_SET_TITLE', payload: 'CATEGORY 1'})

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <ArticleNavigation categoryId={1} />
    </MemoryRouter>
  </Provider>
)

test('render outer div for article navigation', () => {
  expect(wrapper.find('.article-navigation')).toHaveLength(1)
})

test('render link for category of article', () => {
  let link = wrapper.find('.article-navigation').find('Link')
  expect(link.props()['to']).toEqual('/category/1')
  expect(link.text()).toEqual('« Volver a Category 1')
})
