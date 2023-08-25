export const customFetch = (url, headers) =>
  fetch(url, headers).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.statusText);
  });

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  setUserInfo(data) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  changeProfileImage(data) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name: data["place-name"], link: data.link }),
    });
  }
  deleteCard(card) {
    return customFetch(`${this._baseUrl}/cards/${card}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  addLike(cardId) {
    return customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
  }
  deleteLike(cardId) {
    return customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  addHeader(header, value) {
    this._headers[header] = value;
  }
}

export const api = new Api({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  headers: {
  "Content-Type": "application/json",
  },
});

export default Api;
