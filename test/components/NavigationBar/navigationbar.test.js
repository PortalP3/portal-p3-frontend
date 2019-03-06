import React from 'react'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import NavigationBar from '../../../src/components/NavigationBar/NavigationBar'
import { APP_NAME } from '../../../src/config/constants'
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

const wrapper = mount(
  <Provider store={store}>
    <NavigationBar />
  </Provider>
)

store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})

test('navigation bar should have the correct structure', () => {
  const onlyone = 1;
  expect(wrapper.find('Navbar')).toHaveLength(onlyone)
  expect(wrapper.find('Nav')).toHaveLength(onlyone)
})

test('renders category names in menuitems', () => {
  wrapper.find('MenuItem').map((item, i) => {
    if(i==0){
      expect(item.text()).toEqual('INICIO')
    } else if (i > 1) {
      expect(item.text()).toEqual(categories.data[i-2].name)
    }
  })
})

test('renders category links in menuitem', () => {
  wrapper.find('MenuItem').map((item, i) => {
    if(i==0){
      expect(item.props()['href']).toEqual('/')
    } else if (i>1){
      expect(item.props()['href']).toEqual(`/category/${categories.data[i-2].id}`)
    }
    
  })
})

test('renders category divider', () => {
  wrapper.find('MenuItem').map((item, i) => {
    if(i==1){ 
      expect(item.props()['divider']).toBeTruthy()
    }
  })
})