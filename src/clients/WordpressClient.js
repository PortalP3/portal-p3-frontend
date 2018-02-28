import axios from 'axios'

const urlBackend = `${process.env.SERVICE_URL}/${process.env.BASE_URL}`

export default class WordpressClient {

  getCategories() {
    return axios.get(`${urlBackend}/categories`)
  }

  getArticlesByCategory(category) {
    return axios.get(`${urlBackend}/posts?categories=${category}`)
  }

  getAuthorInfo(author) {
    return axios.get(`${urlBackend}/users?id=${author}`)
  }

}
