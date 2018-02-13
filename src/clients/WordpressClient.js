import axios from 'axios'

const urlBackend = 'http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2'

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
