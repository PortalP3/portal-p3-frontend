import React from 'react'
import {shallow} from 'enzyme'

import ArticleContainer from '../../../src/components/Article/ArticleContainer'

const articles = {
  data: [
    {
      id: '1',
      title: {
        rendered: 'title1'
      },
      excerpt: {
        rendered: 'excerpt1'
      }
    },
    {
      id: '2',
      title: {
        rendered: 'title2'
      },
      excerpt: {
        rendered: 'excerpt2'
      }
    }
  ]
}

test('render outer div for articles', () => {
  const wrapper = shallow(<ArticleContainer categoryId='1' />)
  expect(wrapper.find('.article-container')).toHaveLength(1)
})

test('load articles from wordpress', async () => {
  const wordpressClient = {
    getArticlesByCategory: (categoryId) => {
      return Promise.resolve(articles)
    }
  }

  const wrapper = shallow(<ArticleContainer categoryId='1' wordpressClient={wordpressClient}/>)
  await wrapper.instance().componentDidMount()

  expect(wrapper.state('articles')).toEqual(articles.data)
})

test('render Category subcomponents', () => {
  const wrapper = shallow(<ArticleContainer categoryId='1' />)
  wrapper.setState({
    articles: articles.data
  })

  expect(wrapper.find('ArticleExcerpt').at(0).key()).toEqual('1')
  expect(wrapper.find('ArticleExcerpt').at(0).props()['title']).toEqual('title1')
  expect(wrapper.find('ArticleExcerpt').at(0).props()['excerpt']).toEqual('excerpt1')

  expect(wrapper.find('ArticleExcerpt').at(1).key()).toEqual('2')
  expect(wrapper.find('ArticleExcerpt').at(1).props()['title']).toEqual('title2')
  expect(wrapper.find('ArticleExcerpt').at(1).props()['excerpt']).toEqual('excerpt2')
})
