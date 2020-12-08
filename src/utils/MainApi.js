import { MAIN_API_OPTIONS } from './constants';

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
        credentials: 'include',
        headers: this._headers,
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
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._handleResponse);
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
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
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          keyword: JSON.parse(localStorage.getItem('keyword')),
          // eslint-disable-next-line no-undef
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
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._handleResponse);
  }

  deleteArticleById(id) {
    return fetch(`${this._baseUrl}/articles/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._handleResponse);
  }
}

const mainApi = new MainApi(MAIN_API_OPTIONS);
export default mainApi;
