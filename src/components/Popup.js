import { selectorPopupButtonClose } from '../utils/constants.js';
import { classPopupOpened } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(this._selector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
  }

  // функция зарытия поп-апа, по нажатию Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // функция зарытия поп-апа, по клику
  _closeByClick(event) {
    const buttonClose = this._popup.querySelector(selectorPopupButtonClose);
    if ((event.target === this._popup) || (event.target === buttonClose)) {
      this.close();
    }
  }

  // вешаем слушатели
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closeByClick);
  }

  // открытие поп-апа
  open() {
    this._popup.classList.add(classPopupOpened);
    this.setEventListeners();
    window.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие поп-апа
  close() {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(classPopupOpened);
  }

};