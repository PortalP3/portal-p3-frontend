import React from 'react'
import {mount, shallow } from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Rating from '../../../src/components/Rating/Rating'
import reducers from '../../../redux/reducers/Reducers'


const articleMeta = {
  rating: [1.6],
  votes: [2]
}

const wordpressClient = {
  ratePost: (post, value) => {
    return Promise.resolve({
      data: {
        rating: "2.4",
        votes: 3,
        error: ""
      }
    })
  }
}

const store = createStore(reducers)

const wrapper = mount(
  <Provider store={store}>
    <Rating 
      articleMeta={articleMeta}
      articleId={1} 
      wordpressClient={wordpressClient}
    />
  </Provider>
)
const rating = shallow(wrapper.find("Rating").get(0))

test('render outer div for rating', () => {
  expect(wrapper.find('.rating')).toHaveLength(1)
})

test('render five stars', () => {
  expect(wrapper.find('.rating').find('.stars').find('Star')).toHaveLength(5)
})

test('has an initial state', () => {
  let expectedState = {
    rating: 1.6,
    votes: 2
  }
  
  expect(rating.state()).toEqual(expectedState)
})


test('state changes when sending vote', async () => {
  let vote = {
    target: {
      value: 1
    }
  }
  let expectedState = {
    rating: 2.4,
    votes: 3
  }

  await rating.instance().sendVote(vote)
  
  expect(rating.state()).toEqual(expectedState)
})

test('render component when props are undefined', () => {
  let wrapper = mount(
    <Provider store={store}>
      <Rating
        articleMeta={{}}
        articleId={1} 
        wordpressClient={wordpressClient}
      />
    </Provider>
  )

  expect(wrapper.find('.rating')).toHaveLength(1)
})

test('render component when receiving undefined props in componentWillReceiveProps', () => {
  let newArticleProps = {
    articleId: 2,
    articleMeta: {}
  }

  rating.setProps(newArticleProps)

  let expectedState = {
    rating: 0,
    votes: 0
  }

  expect(rating.state()).toEqual(expectedState)
})

test('change state when receiving new props', () => {
  let newArticleProps = {
    articleId: 3,
    articleMeta: {
      rating: [1.0],
      votes: [1]
    }
  }

  rating.setProps(newArticleProps)

  let expectedState = {
    rating: 1.0,
    votes: 1
  }

  expect(rating.state()).toEqual(expectedState)
})

test('render feedback title', () => {
  let expectedTitle = '¿Qué te pareció el artículo?'
  expect(rating.find('.rating').find('h3').text()).toEqual(expectedTitle)
})