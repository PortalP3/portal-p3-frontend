import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Category from '../../../src/components/Category/Category'
import reducers from '../../../redux/reducers/Reducers'

const wrapper = mount(<Provider store={createStore(reducers)}><Category id='1' name='category' image='image'/></Provider>)

test('render outer div for category', () => {
  expect(wrapper.find('.category')).toHaveLength(1)
})

test('render image for category', () => {
  expect(wrapper.find('.category').find('img').props()['src']).toEqual('image')
  expect(wrapper.find('.category').find('img').props()['alt']).toEqual('category')
})

test('render category name', () => {
  expect(wrapper.find('.category').find('h2').text()).toEqual('category')
})
