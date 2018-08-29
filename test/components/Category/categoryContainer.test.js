import React from 'react'
import {mount} from 'enzyme'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'

import CategoryContainer from '../../../src/components/Category/CategoryContainer'
import reducers from '../../../redux/reducers/Reducers'

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
  },
  {
    id: 3,
    name: 'category3',
    acf: {
      image: {
        url: 'image3'
      }
    }
  }]
}

const store = createStore(reducers)
store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})

let wrapper

const wordpressClient = {
  getCategories: () => {
    return Promise.resolve(categories)
  }
}

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <CategoryContainer title='testTitle' selectedCategoryId={1} wordpressClient={wordpressClient} onError={()=>{}} />
      </MemoryRouter>
    </Provider>
  )
})

test('render outer div for categories', () => {
  expect(wrapper.find('.category-container')).toHaveLength(1)
})

test('render title for container', () => {
  expect(wrapper.find('.category-container').find('.container-title').find('h1').text()).toEqual('testTitle')
})

test('render Category subcomponents with selected category', () => {
  assertCategory(0, '2', 'category2', 'image2')
  assertCategory(1, '3', 'category3', 'image3')
})

test('render Category subcomponents without selected category', () => {
  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <CategoryContainer title='testTitle' wordpressClient={wordpressClient} onError={()=>{}} />
      </MemoryRouter>
    </Provider>
  )

  assertCategory(0, '1', 'category1', 'image1')
  assertCategory(1, '2', 'category2', 'image2')
  assertCategory(2, '3', 'category3', 'image3')
})

const assertCategory = (index, id, name, image) => {
  expect(wrapper.find('.container-content').find('Category').at(index).key()).toEqual(id)
  expect(wrapper.find('.container-content').find('Category').at(index).props()['name']).toEqual(name)
  expect(wrapper.find('.container-content').find('Category').at(index).props()['image']).toEqual(image)
}
