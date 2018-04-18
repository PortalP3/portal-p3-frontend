import React from 'react'
import {mount} from 'enzyme';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'

import Home from '../../../src/components/Home/Home'
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

const wordpressClient = {
  getCategories: () => {
    return Promise.resolve(categories)
  }
}

const store = createStore(reducers)
let wrapper

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Home wordpressClient={wordpressClient} onError={() => {}} />
      </MemoryRouter>
    </Provider>
  )
})

test('render main div with categories', () => {
  expect(wrapper.find('.home')).toHaveLength(1)
})

test('render title for categories', () => {
  expect(wrapper.find('.home').find('h1').text()).toEqual('TEMÁTICAS')
})

test('render CategoryContainer', () => {
  expect(wrapper.find('CategoryContainer')).toHaveLength(1)
})

test('render loader when categories are not loaded', () => {
  let wrapper = mount(
    <Provider store={createStore(reducers)}>
      <MemoryRouter>
        <Home wordpressClient={wordpressClient} onError={() => {}} />
      </MemoryRouter>
    </Provider>
  )

  expect(wrapper.find('.home').find('Loading')).toHaveLength(1)
})
