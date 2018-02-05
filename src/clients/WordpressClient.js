import axios from 'axios'

export default class WordpressClient {

  getCategories() {
    return axios.get('http://abacaxi-p3-api.herokuapp.com/wp-json/wp/v2/categories')
  }

}
