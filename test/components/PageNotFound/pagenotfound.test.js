import React from 'react'
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from '../../../redux/reducers/Reducers'

import PageNotFound from '../../../src/components/PageNotFound/PageNotFound'

const store = createStore(reducers)
const wrapper = mount(
  <Provider store={store}>
    <PageNotFound />
  </Provider>
);

test('has pagenotfound-container wrapper', () => {
  expect(wrapper.find('.pagenotfound-container')).toHaveLength(1)
})

test('has pagenotfound class name', () => {
  expect(wrapper.find('.pagenotfound')).toHaveLength(1)
})
