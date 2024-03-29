export class Popup {
  constructor(data) {
    this._selector = data.popupSelector;
    this._classPopupOpened = data.classOpened;
    this._popup = document.querySelector(this._selector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this._buttonClose = this._popup.querySelector(data.selectorButtonClose);
  }

  // функция зарытия поп-апа, по нажатию Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // функция зарытия поп-апа, по клику
  _closeByClick(event) {
    if ((event.target === this._popup) || (event.target === this._buttonClose)) {
      this.close();
    }
  }

  // вешаем слушатели
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closeByClick);
  }

  // открытие поп-апа
  open() {
    this._popup.classList.add(this._classPopupOpened);
    window.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие поп-апа
  close() {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._classPopupOpened);
  }

};