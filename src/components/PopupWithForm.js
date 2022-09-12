import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormForPopup) {
    super(popupSelector);
    this._submitFormForPopup = submitFormForPopup;

    this.form = this._popup.querySelector('form');
    this.buttonSubmit = this.form.querySelector('.popup__submit-button');
    // достаём все элементы полей
    this._inputList = this.form.querySelectorAll('.popup__input');
  }

  // закрытие поп-апа
  close() {
    super.close();
    this.form.reset();
  }

  changeButtonText(text) {
    this.buttonSubmit.textContent = text;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // возвращает текст с inputs
  getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  // вешаем слушатели
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitFormForPopup);
  }

};
