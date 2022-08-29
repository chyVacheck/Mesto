import { Popup } from "./Popup.js";
import { classPopupOpened } from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormForPopup) {
    super(popupSelector);
    this._submitFormForPopup = submitFormForPopup;
    
    this.form = this._popup.querySelector('form');
    this._inputs = Array.from(this.form.querySelectorAll('.popup__input'));
    this._inputName = this._inputs[0];
    this._inputInfo = this._inputs[1];
  }

  // закрытие поп-апа
  close() {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(classPopupOpened);
    this.form.reset();
  }

  // возвращает текст с inputs
  _getInputValues() {
    return {
      name: this._inputName.value,
      info: this._inputInfo.value,
    };
  }

  // вешаем слушатели
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closeByClick.bind(this));
    this.form.addEventListener('submit', this._submitFormForPopup);
  }

};
