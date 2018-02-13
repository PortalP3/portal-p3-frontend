import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {MemoryRouter} from 'react-router-dom'

import Category from '../../../src/components/Category/Category'
import reducers from '../../../redux/reducers/Reducers'

const wrapper = mount(<Provider store={createStore(reducers)}>
                        <MemoryRouter>
                          <Category id={1} name='category' image='image'/>
                        </MemoryRouter>
                      </Provider>)

test('render outer div for category', () => {
  expect(wrapper.find('.category')).toHaveLength(1)
})

test('render Link for ArticleExcerpt', () => {
  expect(wrapper.find('Link').props()['to']).toEqual('/category/1')
})

test('render image for category', () => {
  expect(wrapper.find('.category').find('img').props()['src']).toEqual('image')
  expect(wrapper.find('.category').find('img').props()['alt']).toEqual('category')
})

test('render category name', () => {
  expect(wrapper.find('.category').find('h2').text()).toEqual('category')
})
