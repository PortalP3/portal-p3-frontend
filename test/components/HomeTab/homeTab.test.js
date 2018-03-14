import React from 'react'
import {mount} from 'enzyme'

import HomeTab from '../../../src/components/HomeTab/HomeTab'

const wrapper = mount(<HomeTab />)

test('render main div for home tab', () => {
  expect(wrapper.find('.home-tab')).toHaveLength(1)
})

test('render link to go home', () => {
  expect(wrapper.find('.home-tab').find('a').text()).toEqual('Inicio')
})