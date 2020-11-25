import { newsApiOptions } from './constants';

const { API_KEY } = process.env;

class NewsApi {
  constructor(options) {
    this._getSevenDaysAgoDate = options.getSevenDaysAgoDate;
    this._getCurrentDate = options.getCurrentDate;
  }

  static _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  getArticles({ value }) {
    return fetch(`https://newsapi.org/v2/everything?q=${value}e&from=${this._getSevenDaysAgoDate()}&to=${this._getCurrentDate()}&sortBy=popularity&pageSize=100&apiKey=${API_KEY}`,
      {
        method: 'GET',
      })
      .then(this._handleResponse);
  }
}

const newsApi = new NewsApi(newsApiOptions);
export default newsApi;
