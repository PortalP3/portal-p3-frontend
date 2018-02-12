import React from 'react'
import {mount} from 'enzyme';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Home from '../../../src/components/Home/Home'
import reducers from '../../../redux/reducers/Reducers'

const wrapper = mount(<Provider store={createStore(reducers)}><Home /></Provider>)

test('render main div with categories', () => {
  expect(wrapper.find('.home')).toHaveLength(1)
})

test('render title for categories', () => {
  expect(wrapper.find('.home').find('h1').text()).toEqual('TEMÁTICAS')
})

test('render CategoryContainer', () => {
  expect(wrapper.find('CategoryContainer')).toHaveLength(1)
})
