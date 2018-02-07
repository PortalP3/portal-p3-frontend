import axios from 'axios'

export default class WordpressClient {

  getCategories() {
    return axios.get('http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2/categories')
  }

}
