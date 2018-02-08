import React from 'react'
import {shallow} from 'enzyme';

import Main from '../../../src/components/Main'

test('render main div with categories', () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.find('.main')).toHaveLength(1)
})

test('render title for categories', () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.find('.main').find('h1').text()).toEqual('TEMÁTICAS')
})

test('render CategoryContainer', () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.find('CategoryContainer')).toHaveLength(1)
})
