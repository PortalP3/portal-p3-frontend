import React from 'react'
import {shallow} from 'enzyme';

import App from '../../../src/components/App/App'

const wrapper = shallow(<App />)

test('render Header', () => {
  expect(wrapper.find('Connect(Header)')).toHaveLength(1)
})

test('render Main', () => {
  expect(wrapper.find('Main')).toHaveLength(1)
})

test('render Footer', () => {
  expect(wrapper.find('Footer')).toHaveLength(1)
})

test('render home tab', () => {
  expect(wrapper.find('HomeTab')).toHaveLength(1)
})
