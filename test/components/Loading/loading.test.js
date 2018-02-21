import React from 'react'
import {mount} from 'enzyme';

import Loading from '../../../src/components/Loading/Loading'

const wrapper = mount(<Loading />)

test('render outer div for loader', () => {
  expect(wrapper.find('.loading')).toHaveLength(1)
})

test('render a loading icon', () => {
  expect(wrapper.find('.loading').find('img').props().src).toEqual('/assets/images/loader.svg')
})

test('render a small loading icon', () => {
  const wrapper = mount(<Loading size='small' />)
  expect(wrapper.find('.loading .spinner-small')).toHaveLength(1)
})

test('render a medium loading icon', () => {
  const wrapper = mount(<Loading size='medium' />)
  expect(wrapper.find('.loading .spinner-medium')).toHaveLength(1)
})

test('render a large loading icon', () => {
  const wrapper = mount(<Loading size='large' />)
  expect(wrapper.find('.loading .spinner-large')).toHaveLength(1)
})
