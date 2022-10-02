export default class Api {
  constructor(options, cohortId) {
    this._cohort = cohortId;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.userId = res._id;
        return res;
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return res.json();
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
      return res.json();
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
      return res.json();
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.likes;
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.likes;
      });
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}
