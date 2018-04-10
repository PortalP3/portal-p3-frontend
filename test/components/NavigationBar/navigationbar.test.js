import React from 'react'
import {mount} from 'enzyme';
import NavigationBar from '../../../src/components/NavigationBar/NavigationBar'
import { APP_NAME } from '../../../src/config/constants';

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

const wrapper = mount(<NavigationBar categories={categories} />)



test('navigation bar should have the correct structure', () => {
  const onlyone = 1;
  expect(wrapper.find('Navbar')).toHaveLength(onlyone)
  expect(wrapper.find('Nav')).toHaveLength(onlyone)
  expect(wrapper.find('NavDropdown')).toHaveLength(onlyone)
})

test('renders a menuitem for each category in navigation bar', () => { 
  expect(wrapper.find('MenuItem')).toHaveLength(categories.data.length)
})

test('renders category names in menuitems', () => {
  wrapper.find('MenuItem').map((item, i) => {
    expect(item.text()).toEqual(categories.data[i].name)
  })
})

test('renders category links in menuitem', () => {
  wrapper.find('MenuItem').map((item, i) => {
    expect(item.props()['href']).toEqual(`category/${categories.data[i].id}`)
  })
})

test('renders app name as dropdown title', () => {
  expect(wrapper.find('NavDropdown').props()['title']).toEqual(APP_NAME)
})
