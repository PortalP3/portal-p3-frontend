import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../src/components/Main/Main'
import PageNotFound from '../../../src/components/PageNotFound/PageNotFound';

test('render BrowserRouter', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper.find('BrowserRouter')).toHaveLength(1)
})

test('render route for root', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('BrowserRouter').find('Route').at(0).props().exact).toEqual(true)
  expect(wrapper.find('BrowserRouter').find('Route').at(0).props().path).toEqual('/')
})

test('render route for category', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('BrowserRouter').find('Route').at(1).props().exact).toEqual(true)
  expect(wrapper.find('BrowserRouter').find('Route').at(1).props().path).toEqual('/category/:categoryId?')
})

test('render route for article', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('BrowserRouter').find('Route').at(2).props().exact).toEqual(true)
  expect(wrapper.find('BrowserRouter').find('Route').at(2).props().path).toEqual('/category/:categoryId?/article/:articleId?')
})

test('renders route for PageNotFound', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper.find('BrowserRouter').find('Route').at(3).props().component).toBeDefined()
  expect(wrapper.find('BrowserRouter').find('Route').at(3).props().component).toEqual(PageNotFound)
})
