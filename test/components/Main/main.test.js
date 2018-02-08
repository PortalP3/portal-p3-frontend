import React from 'react'
import {shallow} from 'enzyme';

import Main from '../../../src/components/Main/Main'

test('render BrowserRouter', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper.find('GABrowserRouter')).toHaveLength(1)
  expect(wrapper.find('GABrowserRouter').props()['id']).toEqual('')
})

test('render BrowserRouter', () => {
}
