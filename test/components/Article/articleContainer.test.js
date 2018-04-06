import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {MemoryRouter} from 'react-router-dom'

import ArticleContainer from '../../../src/components/Article/ArticleContainer'
import Header from '../../../src/components/Header/Header'
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
  },
  getCategories: () => {
    return Promise.resolve(categories)
  }
}

const store = createStore(reducers)
store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})

let wrapper

beforeEach(async () => {
  wrapper = await mount(
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

test('render PageNotFound when articles are not found', () => {
  let store = createStore(reducers)
  store.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})

  let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleContainer categoryId={1000000} wordpressClient={wordpressClient} />
      </MemoryRouter>
    </Provider>
  )

  expect(wrapper.find('PageNotFound')).toHaveLength(1)
})

test('render outer div for articles', () => {
  wrapper.update()

  expect(wrapper.find('.article-container')).toHaveLength(1)
})

test('render Category subcomponents', () => {
  wrapper.update()

  assertCategoryContainer(wrapper, 0, '1', 1, 'title1', 'excerpt1', 1)
  assertCategoryContainer(wrapper, 1, '2', 2, 'title2', 'excerpt2', 2)

  expect(wrapper.find('CategoryContainer').props()['title']).toEqual('OTRAS TEMÁTICAS')
})

test('render articles when categories are not loaded before', (done) => {
  function todo(wrapper) {
    wrapper.update()
    assertCategoryContainer(wrapper, 0, '1', 1, 'title1', 'excerpt1', 1)
    done()
  }

  let store = createStore(reducers)

  let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleContainer categoryId={1} wordpressClient={wordpressClient} />
      </MemoryRouter>
    </Provider>
  )

  setTimeout(() => {
    todo(wrapper)
  }, 0);
})

test(' after article container is loaded, updates the header content setting a background picture', (done) => {
  
  function finishUpdate(){
    wrapper.update()
    const wrapperProps      = wrapper.find('Header').find('header').props()
    expect(wrapperProps['style'].backgroundImage).toEqual(newBackgroundUrl)
    done()
  }
  const newBackgroundUrl  = 'url('+categories.data[0].acf.image.url+')'
  
  const wrapper = mount(
    <Provider store={createStore(reducers)}>
      <MemoryRouter>
        <div>
          <Header />
          <ArticleContainer categoryId={categories.data[0].id} wordpressClient={wordpressClient} />
        </div>
      </MemoryRouter>
    </Provider>)
  
  setTimeout(() => {
    finishUpdate(wrapper)
  }, 0);
})


const assertCategoryContainer = (wrapper, index, key, id, title, excerpt, authorId) => {
  expect(wrapper.find('Connect(ArticleExcerpt)').at(index).key()).toEqual(key)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['id']).toEqual(id)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['title']).toEqual(title)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['excerpt']).toEqual(excerpt)
  expect(wrapper.find('ArticleExcerpt').at(index).props()['authorId']).toEqual(authorId)
}
