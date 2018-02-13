import axios from 'axios'

export default class WordpressClient {

  getCategories() {
    return axios.get('http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2/categories')
  }

  getArticlesByCategory(category) {
    return axios.get(`http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2/posts?categories=${category}`)
  }

  getAuthorInfo(author) {
    return axios.get(`http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2/users?id=${author}`)
  }

}
