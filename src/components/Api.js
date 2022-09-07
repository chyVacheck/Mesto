
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

}
