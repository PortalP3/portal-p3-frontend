import React from 'react'
import {shallow} from 'enzyme';

import Header from '../../../src/components/Header/Header'

test('render header tag', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('header')).toHaveLength(1)
})

test('render outer div', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('header').find('.logo-portal-info-container')).toHaveLength(1)
})

test('render inner div', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal')).toHaveLength(1)
})

test('render header title', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal')
    .text()).toEqual('PORTAL P3Esta plataforma tiene como objetivo el compartir conocimiento' +
      ' crítico que pueda alimentar nuestro compromiso por la justicia social y económica')
})

test('render header subtitle in a separate paragraph', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('header').find('.logo-portal-info-container').find('.logo-portal').find('p')
    .text()).toEqual('Esta plataforma tiene como objetivo el compartir conocimiento' +
      ' crítico que pueda alimentar nuestro compromiso por la justicia social y económica')
})
