
export class Api {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  //возвращает данные о пользователе, используя ссылку 
  getUserInfo() {
    return fetch(`${this._adress}/cohort-50/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        console.log('Данные о профиле успешно получены c серверa')
        return res.json()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
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
  }

  setUserAvatar(avatar) {
    return fetch(`${this._adress}/cohort-50/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      console.log('Аватар был поменян');
      return res.json();
    })
    .catch((error) => {
      return console.log(`Ошибка: ${error}`);
    })
  }

  getCardArray() {
    return fetch(`${this._adress}/cohort-50/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        console.log('Массив карточек успешно получен c серверa')
        return res.json()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
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
      .then((res) => {
        console.log('Карточка загружена на сервер');
        return res.json()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))

  }

  deleteCard(card) {
    return fetch(`${this._adress}/cohort-50/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        console.log('Карточка удалена с сервера');
        return res.json()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  changeLike(card, userId) {
    let action = "PUT"
    card.likes.forEach((like) => {
      if (like._id == userId){
        action = "DELETE"
      }
    })

    return fetch(`${this._adress}/cohort-50/cards/${card._id}/likes`,{
      method: action,
      headers: this._headers,
    })
    .then((res) => {
      
      console.log('Лайк был', action);
      return res.json();
    })
    .catch((error) => {
      return console.log(`Ошибка: ${error}`);
    })
  }

}
