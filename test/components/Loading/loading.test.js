import React from 'react'
import {mount} from 'enzyme';

import Loading from '../../../src/components/Loading/Loading'

const wrapper = mount(<Loading />)

test('render outer div for loader', () => {
  expect(wrapper.find('.loading')).toHaveLength(1)
})

test('render a loading icon', () => {
  expect(wrapper.find('.loading').find('Icon').props()['type']).toEqual('loading')
})
