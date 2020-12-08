import { NEWS_API_OPTIONS } from './constants';

class NewsApi {
  constructor(options) {
    this._getSevenDaysAgoDate = options.getSevenDaysAgoDate;
    this._getCurrentDate = options.getCurrentDate;
    this._key = options.key;
    this._baseUrl = options.baseUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  getArticles(value) {
    return fetch(`${this._baseUrl}/v2/everything?q=${value}&from=${this._getSevenDaysAgoDate()}&to=${this._getCurrentDate()}&sortBy=popularity&pageSize=100&apiKey=${this._key}`)
      .then(this._handleResponse);
  }
}

const newsApi = new NewsApi(NEWS_API_OPTIONS);
export default newsApi;
