import newsApiOptions from './constants';

const { API_KEY } = process.env;
// eslint-disable-next-line no-console
console.log(API_KEY);

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

  getArticles() {
    return fetch(`https://newsapi.org/v2/everything?q=еда&from=${this._getSevenDaysAgoDate()}&to=${this._getCurrentDate()}&sortBy=popularity&country=ru&pageSize=100&apiKey=e7f9ea0f4c6648ad9d59c29246d45eef`)
      .then(this._handleResponse);
  }
}

const newsApi = new NewsApi(newsApiOptions);
export default newsApi;
