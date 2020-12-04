import { mainApiOptions } from './constants';

class MainApi {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  register(userName, userEmail, userPassword) {
    return fetch(`${this._baseUrl}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      })
      .then(this._handleResponse);
  }

  login(userEmail, userPassword) {
    return fetch(`${this._baseUrl}/signin`,
      {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      })
      .then(this._handleResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._handleResponse);
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._handleResponse);
  }

  createArticle(
    articleTitle,
    articleText,
    articleDate,
    articleSource,
    articleLink,
    articleImage,
  ) {
    return fetch(`${this._baseUrl}/articles`,
      {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          keyword: JSON.parse(localStorage.getItem('keyword')),
          title: articleTitle,
          text: articleText,
          date: articleDate,
          source: articleSource,
          link: articleLink,
          image: articleImage,
        }),
      })
      .then(this._handleResponse);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._handleResponse);
  }

  deleteArticleById(id) {
    return fetch(`${this._baseUrl}/articles/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._handleResponse);
  }
}

const mainApi = new MainApi(mainApiOptions);
export default mainApi;
