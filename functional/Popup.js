import { selectorPopupButtonClose } from './constants.js';

export class Popup{
  constructor(selector){
    this._selector = selector;
    this._popup = _getTemplate();
  }
  
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners(event) {
    const buttonClose = this._popup.querySelector(selectorPopupButtonClose);
    if ((event.target === this._popup) || (event.target === buttonClose)) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  // поиск template
  _getTemplate() {
    const popup = document.querySelector(this._selector)
    return popup;    
  }

}