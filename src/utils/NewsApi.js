import newsApiOptions from './constants';

class NewsApi {
  constructor(options) {
    this._getSevenDaysAgoDate = options.getSevenDaysAgoDate;
    this._getCurrentDate = options.getCurrentDate;
  }

  // eslint-disable-next-line class-methods-use-this
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  getArticles(value) {
    return fetch(`https://newsapi.org/v2/everything?q=${value}&from=${this._getSevenDaysAgoDate()}&to=${this._getCurrentDate()}&sortBy=popularity&pageSize=100&apiKey=e7f9ea0f4c6648ad9d59c29246d45eef`)
      .then(this._handleResponse);
  }
}

const newsApi = new NewsApi(newsApiOptions);
export default newsApi;
