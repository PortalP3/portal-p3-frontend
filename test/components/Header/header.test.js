import React from 'react'
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Header from '../../../src/components/Header/Header'
import reducers from '../../../redux/reducers/Reducers'
import { QUESTIONS_BACKGROUND_URL, APP_NAME_MEANING, RESPONSE2 } from '../../../src/config/constants'

const wrapper = mount(<Provider store={createStore(reducers)}><Header /></Provider>)

test('render header tag', () => {
  expect(wrapper.find('header')).toHaveLength(1)
})

test('render outer div', () => {
  expect(wrapper.find('header').find('.logo-portal-info-container')).toHaveLength(1)
})

test('render inner div', () => {
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal')).toHaveLength(1)
})

test('render header title', () => {
  let logo = wrapper.find('header').find('.logo-portal')
  expect(logo.find('h1').first().text()).toEqual(APP_NAME_MEANING)
})

test('render header subtitle in a separate paragraph', () => {
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal').find('p').last()
    .text()).toEqual(RESPONSE2)
})

test('renders header background image as QUESTIONS_BACKGROUND_URL', () => {
  
  const newBackgroundUrl  = QUESTIONS_BACKGROUND_URL
  
  const wrapper = mount(
    <Provider store={createStore(reducers)}>
      <Header />
    </Provider>)

  const wrapperProps = wrapper.find('Header').find('img').props()
  expect(wrapperProps.src).toEqual(newBackgroundUrl)
})
