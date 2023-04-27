import { backend } from "../config.js";

/**
 * info: backend puts jwt in httpOnly cookies
 */

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._options = {
      credentials: 'include', // send cookie including httpOnly cookies with jwt
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
  }

  // User
  getUserMe() {
    this._options.method = 'GET';
    if (this._options.body) delete this._options.body;
    return this._request(`${this._baseUrl}/users/me`)
  }

  patchUserMe(name, about) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      name: name,
      about: about
    })
    return this._request(`${this._baseUrl}/users/me`)
  }

  patchUserMeAvatar(url) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      avatar: url
    })
    return this._request(`${this._baseUrl}/users/me/avatar`)
  }

  // Cards
  getCards() {
    this._options.method = 'GET';
    if (this._options.body) delete this._options.body;
    return this._request(`${this._baseUrl}/cards`)
  }

  postCard(link, name) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({
      name: name,
      link: link
    })
    return this._request(`${this._baseUrl}/cards`)
  }

  deleteCard(cardId) {
    this._options.method = 'DELETE';
    return this._request(`${this._baseUrl}/cards/${cardId}`)
  }

  // Likes
  putLike(cardId) {
    this._options.method = 'PUT';
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`)
  }

  deleteLike(cardId) {
    this._options.method = 'DELETE';
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`)
  }

  _request(url) {
    return fetch(url, this._options).then(response => this._convertResponseToJson(response))
  }

  _convertResponseToJson(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const api = new Api(backend.baseUrl);

export default api
