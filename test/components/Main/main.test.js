import React from 'react'
import {shallow} from 'enzyme';

import Main from '../../../src/components/Main/Main'

// test('render BrowserRouter', () => {
//   const wrapper = shallow(<Main />)
//   expect(wrapper.find('BrowserRouter')).toHaveLength(1)
// })
//
// test('render route for root', () => {
//   const wrapper = shallow(<Main />)
//
//   expect(wrapper.find('BrowserRouter').find('Route').at(0).props().exact).toEqual(true)
//   expect(wrapper.find('BrowserRouter').find('Route').at(0).props().path).toEqual('/')
// })
//
// test('render route for category', () => {
//   const wrapper = shallow(<Main />)
//
//   expect(wrapper.find('BrowserRouter').find('Route').at(1).props().exact).toEqual(true)
//   expect(wrapper.find('BrowserRouter').find('Route').at(1).props().path).toEqual('/category/:categoryId?')
// })
//
// test('render default route', () => {
//   const wrapper = shallow(<Main />)
//
//   expect(wrapper.find('BrowserRouter').find('Route').at(2).props().render).toBeDefined()
// })
