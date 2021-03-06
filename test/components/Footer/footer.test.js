import React from 'react'
import {shallow} from 'enzyme';

import Footer from '../../../src/components/Footer/Footer'

test('render footer tag', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('footer')).toHaveLength(1)
})

test('render footer text in a separate paragraph', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('footer').find('p').text()).toEqual('Amawta - Copyrights 2018')
})
