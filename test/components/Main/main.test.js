import React from 'react'
import {shallow} from 'enzyme'
import {createStore} from 'redux'
import reducers from '../../../redux/reducers/Reducers'
import Main from '../../../src/components/Main/Main'
import PageNotFound from '../../../src/components/PageNotFound/PageNotFound';

test('render BrowserRouter', () => {
  const wrapper = shallow(<Main />)

  console.log('id', wrapper.props());

  expect(wrapper.find('GABrowserRouter')).toHaveLength(1)
})

test('render route for root', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('GABrowserRouter').find('Route').at(0).props().exact).toEqual(true)
  expect(wrapper.find('GABrowserRouter').find('Route').at(0).props().path).toEqual('/')
})

test('render route for category', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('GABrowserRouter').find('Route').at(1).props().exact).toEqual(true)
  expect(wrapper.find('GABrowserRouter').find('Route').at(1).props().path).toEqual('/category/:categoryId?')
})

test('render route for article', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('GABrowserRouter').find('Route').at(2).props().exact).toEqual(true)
  expect(wrapper.find('GABrowserRouter').find('Route').at(2).props().path).toEqual('/category/:categoryId?/article/:articleId?')
})

test('renders route for PageNotFound', () => {
  const wrapper = shallow(<Main />)

  expect(wrapper.find('GABrowserRouter').find('Route').at(3).props().component).toBeDefined()
  expect(wrapper.find('GABrowserRouter').find('Route').at(3).props().component).toEqual(PageNotFound)
})


test('renders InternalError when state is changed', () => {
  const store   = createStore(reducers)
  const wrapper = shallow(<Main store={store} />)

  expect(wrapper.find('PageNotFound')).toBeDefined()
  const spy = jest.spyOn(Main.prototype, 'render');

  wrapper.setState({
    showError: true,
    title: "title",
    message: "message"
  }, ()=>{
    expect(wrapper.state('showError')).toBeTruthy()
    expect(spy).toHaveBeenCalled();
  })
  
})
