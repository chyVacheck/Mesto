
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

  getCardArray() {
    return fetch(`${this._adress}/cohort-50/cards `, {
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
    return fetch(`${this._adress}/cohort-50/cards `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(() => console.log('Карточка загружена на сервер'))
      .catch((error) => console.log(`Ошибка: ${error}`))

  }

}