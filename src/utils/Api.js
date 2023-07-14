class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, { method, headers, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers,
      body
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return this._request('/users/me', { method: 'GET', headers: this._headers });
  }

  sendUserInfo({ name, about }) {
    return this._request('/users/me', { method: 'PATCH', headers: this._headers, body: JSON.stringify({ name, about })});
  }

  getInitialCards() {
    return this._request('/cards', {method: 'GET', headers: this._headers});
  }

  sendCardInfo({ name, link }) {
    return this._request('/cards', { method: 'POST', headers: this._headers, body: JSON.stringify({ name, link })});
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {method: 'DELETE', headers: this._headers});
  }

  putLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'PUT', headers: this._headers});
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'DELETE', headers: this._headers});
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.putLike(cardId)
  }

  sendAvatarInfo(avatar) {
    return this._request('/users/me/avatar', { method: 'PATCH', headers: this._headers, body: JSON.stringify(avatar)});
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '8a0eefc6-3d0c-44b4-be01-a96205454bf1',
    'Content-Type': 'application/json'
  }
})

export {api, Api}