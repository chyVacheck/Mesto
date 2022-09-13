import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(data) {
    super(data);
    this._title = this._popup.querySelector('.popup__card-title');
    this._image = this._popup.querySelector('.popup__card-image');
  }
  // открытие поп-апа
  open(src, text) {
    super.open();
    this._title.textContent = text;
    this._image.alt = text;
    this._image.src = src;
  }
};
