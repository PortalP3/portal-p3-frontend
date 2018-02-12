import React from 'react'
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Header from '../../../src/components/Header/Header'
import reducers from '../../../redux/reducers/Reducers'

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
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal')
    .text()).toEqual('PORTAL P3Esta plataforma tiene como objetivo el compartir conocimiento' +
      ' crítico que pueda alimentar nuestro compromiso por la justicia social y económica')
})

test('render header subtitle in a separate paragraph', () => {
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal').find('p')
    .text()).toEqual('Esta plataforma tiene como objetivo el compartir conocimiento' +
      ' crítico que pueda alimentar nuestro compromiso por la justicia social y económica')
})
