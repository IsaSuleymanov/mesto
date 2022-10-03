export default class Api {
  constructor(options, cohortId) {
    this._cohort = cohortId;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _returnRes(res) {
    if (res.ok) return res.json();
  }

  _catchError(res) {
    console.log(err);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      this._catchError(err);
    });
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).catch((err) => {
      this._catchError(err);
    });
  }
}
