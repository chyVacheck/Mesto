
export class Api {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(res) {
    // тут проверка ответа
    if (res.ok) {
      console.log('Запрос на сервер обработан удачно');
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //возвращает данные о пользователе, используя ссылку 
  getUserInfo() {
    return fetch(`${this._adress}/cohort-50/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  setUserInfo(user) {
    return fetch(`${this._adress}/cohort-50/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(this._checkResponse)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._adress}/cohort-50/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }

  getCardArray() {
    return fetch(`${this._adress}/cohort-50/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addNewCard(card) {
    return fetch(`${this._adress}/cohort-50/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(card) {
    return fetch(`${this._adress}/cohort-50/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  changeLike(card, userId) {
    let action = "PUT"
    card.likes.forEach((like) => {
      if (like._id == userId) {
        action = "DELETE"
      }
    })

    return fetch(`${this._adress}/cohort-50/cards/${card._id}/likes`, {
      method: action,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}
