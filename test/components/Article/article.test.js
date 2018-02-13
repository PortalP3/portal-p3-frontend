import React from 'react'
import {shallow} from 'enzyme'

import Article from '../../../src/components/Article/Article'

test('render outer div for article', () => {
  const wrapper = shallow(<Article />)
  expect(wrapper.find('.article')).toHaveLength(1)
})
