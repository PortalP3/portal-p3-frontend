import React from 'react'
import {shallow} from 'enzyme';

import Home from '../../../src/components/Home/Home'

test('render main div with categories', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('.home')).toHaveLength(1)
})

test('render title for categories', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('.home').find('h1').text()).toEqual('TEMÁTICAS')
})

test('render CategoryContainer', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('CategoryContainer')).toHaveLength(1)
})
