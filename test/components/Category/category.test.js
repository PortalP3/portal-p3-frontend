import React from 'react'
import {shallow} from 'enzyme'

import Category from '../../../src/components/Category/Category'

test('render outer div for category', () => {
  const wrapper = shallow(<Category id={1} name='category' image='image'/>)
  expect(wrapper.find('.category')).toHaveLength(1)
})

test('render image for category', () => {
  const wrapper = shallow(<Category id={1} name='category' image='image'/>)
  expect(wrapper.find('.category').find('img').props()['src']).toEqual('image')
  expect(wrapper.find('.category').find('img').props()['alt']).toEqual('category')
})

test('render category name', () => {
  const wrapper = shallow(<Category id={1} name='category' image='image'/>)
  expect(wrapper.find('.category').find('h2').text()).toEqual('category')
})
