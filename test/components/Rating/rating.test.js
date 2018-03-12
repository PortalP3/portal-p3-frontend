import React from 'react'
import {mount} from 'enzyme'
import Rating from '../../../src/components/Rating/Rating'

const articleMeta = {
  rating: [1.6],
  votes: [2]
}

const wordpressClient = {
  ratePost: (post, value) => {
    return Promise.resolve({
      data: {
        rating: [2.4],
        votes: [3]
      }
    })
  }
}

const wrapper = mount(
  <Rating 
    articleMeta={articleMeta}
    articleId={1} 
    wordpressClient={wordpressClient}
  />
)

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
  
  expect(wrapper.state()).toEqual(expectedState)
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

  await wrapper.instance().sendVote(vote)
  expect(wrapper.state()).toEqual(expectedState)
})

test('change state when receiving new props', () => {
  let newArticleProps = {
    articleId: 2,
    articleMeta: {
      rating: [1.0],
      votes: [1]
    }
  }

  wrapper.setProps(newArticleProps)

  let expectedState = {
    rating: 1.0,
    votes: 1
  }

  expect(wrapper.state()).toEqual(expectedState)
})