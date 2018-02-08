import React from 'react'
import {shallow} from 'enzyme'

import ArticleExcerpt from '../../../src/components/Article/ArticleExcerpt'

test('render outer div for article excerpt', () => {
  const wrapper = shallow(<ArticleExcerpt title='title' excerpt='excerpt' />)
  expect(wrapper.find('.article-excerpt')).toHaveLength(1)
})

test('render h2 with title for article excerpt', () => {
  const wrapper = shallow(<ArticleExcerpt title='title' excerpt='excerpt' />)
  expect(wrapper.find('.article-excerpt').find('h2').text()).toEqual('title')
})

test('parse html with excerpt for article excerpt', () => {
  const html = '<p>excerpt</p>'
  const wrapper = shallow(<ArticleExcerpt title='title' excerpt={html} />)
  expect(wrapper.find('.article-excerpt').find('p').text()).toEqual('excerpt')
})
