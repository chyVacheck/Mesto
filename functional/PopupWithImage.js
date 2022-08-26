import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__card-title');
    this._image = this._popup.querySelector('.popup__card-image');
  }
  // открытие поп-апа
  open(src, text) {
    this._title.textContent = text;
    this._image.src = src;
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mousedown', this.setEventListeners.bind(this));
    window.addEventListener('keydown', this._handleEscClose);
  }
};
