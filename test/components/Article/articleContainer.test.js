import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {MemoryRouter} from 'react-router-dom'

import ArticleContainer from '../../../src/components/Article/ArticleContainer'
import reducers from '../../../redux/reducers/Reducers'

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
  }]
}

const articles = {
  data: [
    {
      id: 1,
      author: 1,
      title: {
        rendered: 'title1'
      },
      excerpt: {
        rendered: 'excerpt1'
      }
    },
    {
      id: 2,
      author: 2,
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
store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})

let wrapper

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleContainer categoryId={1} wordpressClient={wordpressClient} />
      </MemoryRouter>
    </Provider>
  )
})

test('render Loader when articles are not loaded', () => {
  let store = createStore(reducers)
  store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
  
  let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleContainer categoryId={1} wordpressClient={wordpressClient} />
      </MemoryRouter>
    </Provider>
  )

  expect(wrapper.find('Loading')).toHaveLength(1)
})

test('render outer div for articles', () => {
  expect(wrapper.find('.article-container')).toHaveLength(1)
})

test('render Category subcomponents', () => {
  assertCategoryContainer(0, '1', 1, 'title1', 'excerpt1', 1)
  assertCategoryContainer(1, '2', 2, 'title2', 'excerpt2', 2)

  expect(wrapper.find('CategoryContainer').props()['title']).toEqual('OTRAS TEMÁTICAS')
})

const assertCategoryContainer = (index, key, id, title, excerpt, authorId) => {
  expect(wrapper.find('Connect(ArticleExcerpt)').at(index).key()).toEqual(key)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['id']).toEqual(id)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['title']).toEqual(title)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['excerpt']).toEqual(excerpt)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['authorId']).toEqual(authorId)
}
