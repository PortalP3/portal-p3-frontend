import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import ArticleNavigation from '../../../src/components/Article/ArticleNavigation'
import reducers from '../../../redux/reducers/Reducers'

const article1 = {
  id: 1,
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
  id: 2,
  date: '2018-02-02T14:19:11',
  modified: '2018-02-04T14:19:11',
  title: {
    rendered: 'title2'
  },
  content: {
    rendered: 'excerpt2'
  }
}

const article3 = {
  id: 3,
  date: '2018-02-02T14:19:11',
  modified: '2018-02-04T14:19:11',
  title: {
    rendered: 'title3'
  },
  content: {
    rendered: 'excerpt3'
  }
}

const articles = [article1, article2, article3]

const store = createStore(reducers)

store.dispatch({type: 'HEADER_SET_TITLE', payload: 'CATEGORY 1'})
store.dispatch({type: 'CATEGORY_SET_ARTICLES', payload: articles})

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <ArticleNavigation categoryId={1} articleId={2} />
    </MemoryRouter>
  </Provider>
)

test('render outer div for article navigation', () => {
  expect(wrapper.find('.article-navigation')).toHaveLength(1)
})

test('render link for category of article', () => {
  let link = wrapper.find('.article-navigation').find('.back-to-category').find('Link')
  expect(link.props()['to']).toEqual('/category/1')
  expect(link.text()).toEqual('« Volver a Category 1')
})

test('render link for previous and next article', () => {
  let previousLink = wrapper.find('.article-navigation').find('.previous-next-article').find('Link').at(0)
  let nextLink = wrapper.find('.article-navigation').find('.previous-next-article').find('Link').at(1)

  expect(previousLink.props()['to']).toEqual('/category/1/article/1')
  expect(previousLink.text()).toEqual('« title1')

  expect(nextLink.props()['to']).toEqual('/category/1/article/3')
  expect(nextLink.text()).toEqual('title3 »')
})

test('render link for previous article when there is no next article', () => {
  let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleNavigation categoryId={1} articleId={3} />
      </MemoryRouter>
    </Provider>
  )

  let previousLink = wrapper.find('.article-navigation').find('.previous-next-article').find('Link')

  expect(previousLink.props()['to']).toEqual('/category/1/article/2')
  expect(previousLink.text()).toEqual('« title2')
})

test('render link for next article when there is no previous article', () => {
  let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleNavigation categoryId={1} articleId={1} />
      </MemoryRouter>
    </Provider>
  )

  let nextLink = wrapper.find('.article-navigation').find('.previous-next-article').find('Link')

  expect(nextLink.props()['to']).toEqual('/category/1/article/2')
  expect(nextLink.text()).toEqual('title2 »')
})
