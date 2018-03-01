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

  getNonce() {
    return axios.get(`${process.env.SERVICE_URL}/index.php/wp-json/nonce/v1/get`)
  }

  async ratePost(post, value) {
    let nonce = await this.getNonce()
    nonce = nonce.data.nonce

    return axios.get(`${process.env.SERVICE_URL}/${process.env.RATE_POST_URL}?action=rate_post&nonce=${nonce}&post_id=${post}&rate=${value}`)
  }

}
