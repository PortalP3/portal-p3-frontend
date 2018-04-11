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
  expect(wrapper.find('NavDropdown')).toHaveLength(onlyone)
})

test('renders a menuitem for each category in navigation bar', () => { 
  wrapper.update()
  expect(wrapper.find('MenuItem')).toHaveLength(categories.data.length+2)
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

test('renders app name as dropdown title', () => {
  expect(wrapper.find('NavDropdown').props()['title']).toEqual(APP_NAME)
})
