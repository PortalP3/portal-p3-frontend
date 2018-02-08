import React from 'react'
import {shallow} from 'enzyme'

import CategoryContainer from '../../../src/components/Category/CategoryContainer'

const categories = {
  data: [{
    id: 1,
    name: 'category1',
    acf: {
      image: {
        url: 'image1'
      }
    }
  },
  {
    id: 2,
    name: 'category2',
    acf: {
      image: {
        url: 'image2'
      }
    }
  }]
}

test('render outer div for categories', () => {
  const wrapper = shallow(<CategoryContainer />)
  expect(wrapper.find('.category-container')).toHaveLength(1)
})

test('load categories from wordpress', async () => {
  const wordpressClient = {
    getCategories: () => {
      return Promise.resolve(categories)
    }
  }

  const wrapper = shallow(<CategoryContainer wordpressClient={wordpressClient}/>)
  await wrapper.instance().componentDidMount()

  expect(wrapper.state('categories')).toEqual(categories.data)
})

test('render Category subcomponents', () => {
  const wrapper = shallow(<CategoryContainer />)
  wrapper.setState({
    categories: categories.data
  })


  expect(wrapper.find('Category').at(0).key()).toEqual('1')
  expect(wrapper.find('Category').at(0).props()['name']).toEqual('category1')
  expect(wrapper.find('Category').at(0).props()['image']).toEqual('image1')

  expect(wrapper.find('Category').at(1).key()).toEqual('2')
  expect(wrapper.find('Category').at(1).props()['name']).toEqual('category2')
  expect(wrapper.find('Category').at(1).props()['image']).toEqual('image2')
})
