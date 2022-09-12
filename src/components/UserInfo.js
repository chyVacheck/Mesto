
export class UserInfo {
  constructor(user, handleAvatarClick) {
    this._name = document.querySelector(user.name);
    this._about = document.querySelector(user.about);
    this._avatar = document.querySelector(user.image);
    this._element = document.querySelector('.profile__avatar');
    this._handleAvatarClick = handleAvatarClick;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id,
    }
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._id = user._id;
  }

  setEventListner() {
    this._element.addEventListener('click', this._handleAvatarClick)
  }

  setUserAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
