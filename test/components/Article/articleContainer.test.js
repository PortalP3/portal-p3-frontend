import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {MemoryRouter} from 'react-router-dom'

import ArticleContainer from '../../../src/components/Article/ArticleContainer'
import reducers from '../../../redux/reducers/Reducers'

const articles = {
  data: [
    {
      id: 1,
      title: {
        rendered: 'title1'
      },
      excerpt: {
        rendered: 'excerpt1'
      }
    },
    {
      id: 2,
      title: {
        rendered: 'title2'
      },
      excerpt: {
        rendered: 'excerpt2'
      }
    }
  ]
}

const wordpressClient = {
  getArticlesByCategory: (categoryId) => {
    return Promise.resolve(articles)
  }
}

const store = createStore(reducers)
let wrapper

beforeEach(() => {
  wrapper = mount(<Provider store={store}>
                    <MemoryRouter>
                      <ArticleContainer categoryId={1} wordpressClient={wordpressClient} />
                    </MemoryRouter>
                  </Provider>)
})

test('render outer div for articles', () => {
  expect(wrapper.find('.article-container')).toHaveLength(1)
})

test('render Category subcomponents', () => {
  wrapper.setState({
    articles: articles.data
  })

  expect(wrapper.find('ArticleExcerpt').at(0).props()['id']).toEqual(1)
  expect(wrapper.find('ArticleExcerpt').at(0).props()['title']).toEqual('title1')
  expect(wrapper.find('ArticleExcerpt').at(0).props()['excerpt']).toEqual('excerpt1')

  expect(wrapper.find('ArticleExcerpt').at(1).props()['id']).toEqual(2)
  expect(wrapper.find('ArticleExcerpt').at(1).props()['title']).toEqual('title2')
  expect(wrapper.find('ArticleExcerpt').at(1).props()['excerpt']).toEqual('excerpt2')
})
