import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import ArticleExcerpt from '../../../src/components/Article/ArticleExcerpt'
import reducers from '../../../redux/reducers/Reducers'

const store = createStore(reducers)
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <ArticleExcerpt id={1} categoryId={1} date={'2018-02-02T14:19:11'} authorName={"author_name"} title='title' excerpt='<p>excerpt</p>' />
    </MemoryRouter>
  </Provider>
)

test('render outer div for article excerpt', () => {
  expect(wrapper.find('.article-excerpt')).toHaveLength(1)
})

test('render Link for article content', () => {
  expect(wrapper.find('Link').props()['to']).toEqual('/category/1/article/1')
})

test('render h2 with title for article excerpt', () => {
  expect(wrapper.find('.article-excerpt').find('h2').text()).toEqual('title')
})

test('parse html with excerpt for article excerpt', () => {
  expect(wrapper.find('.article-excerpt').find('p').text()).toEqual('excerpt')
})
