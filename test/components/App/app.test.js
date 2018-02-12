import React from 'react'
import {shallow} from 'enzyme';

import App from '../../../src/components/App/App'

test('render Header', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Connect(Header)')).toHaveLength(1)
})

test('render Main', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Main')).toHaveLength(1)
})

test('render Footer', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Footer')).toHaveLength(1)
})
