import React from 'react'
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from '../../../redux/reducers/Reducers'
import InternalError from '../../../src/components/InternalError/InternalError'

const title = "title lorem ipsum"
const message = " You're a funny guy sully. That's why i'm going to kill you last. Go on! You set us up. Cool off. Dylan. You're one, ugly, muthafucka. To be or not to be. Into the boat."

const store = createStore(reducers)

const wrapper = mount(<Provider store={store}><InternalError title={title} message={message} /></Provider>);

test('has internalerror-container wrapper', () => {
  expect(wrapper.find('.internalerror-container')).toHaveLength(1)
})

test('has internalerror class name', () => {
  expect(wrapper.find('.internalerror')).toHaveLength(1)
})

test('makes use of the props', () => {
  expect(wrapper.find('h1').first().text()).toEqual(title)
  expect(wrapper.find('p').first().text()).toEqual(`Por favor intente más tarde (${message})`)
})