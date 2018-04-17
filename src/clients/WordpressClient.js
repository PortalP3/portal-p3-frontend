import axios from 'axios'

const urlBackend = `${process.env.SERVICE_URL}/${process.env.BASE_URL}`

const instance = axios.create({
  baseURL: urlBackend,
  timeout: 30000
});

export default class WordpressClient {

  getCategories() {
    return instance.get('/categories').catch((error)=>{ return {data: [], errorMessage: error}})
  }

  getArticlesByCategory(category) {
    return axios.get(`${urlBackend}/posts?categories=${category}`).catch((error)=>{ return {data: [], errorMessage: error}})
  }

  getAuthorInfo(author) {
    return axios.get(`${urlBackend}/users?id=${author}`).catch((error)=>{ return {data: [], errorMessage: error}})
  }

  getNonce() {
    return axios.get(`${process.env.SERVICE_URL}/api/nonce/get/`).catch((error)=>{ return {data: [], errorMessage: error}})
  }

  async ratePost(post, value) {
    let nonce = await this.getNonce()
    nonce = nonce.data.nonce

    return axios.get(`${process.env.SERVICE_URL}/${process.env.RATE_POST_URL}?action=rate_post&nonce=${nonce}&post_id=${post}&rate=${value}`)
      .catch((error)=>{ return {data: [], errorMessage: error}})
  }

}
