import React from 'react'
import {shallow} from 'enzyme';

import App from '../../../src/components/App'

test('render Header', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Header')).toHaveLength(1)
})

test('render Main', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Main')).toHaveLength(1)
})

test('render Footer', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Footer')).toHaveLength(1)
})
