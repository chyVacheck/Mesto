
export class UserInfo {
  constructor(user) {
    this._name = document.querySelector(user.name);
    this._info = document.querySelector(user.info);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._info.textContent = user.info;
  }
}