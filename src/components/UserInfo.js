
export class UserInfo {
  constructor(user) {
    this._name = document.querySelector(user.name);
    this._about = document.querySelector(user.about);
    this._image = document.querySelector(user.image);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      image: this._image.src,
      id: this._id,
    }
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._id = user._id;
  }
}