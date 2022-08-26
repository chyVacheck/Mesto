import { selectorPopupButtonClose } from './constants.js';

export class Popup{
  constructor(popupSelector){
    this._selector = popupSelector;
    this._popup = this._getTemplate();
    this._handleEscClose = this._handleEscClose.bind(this);
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

  // открытие поп-апа
  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mousedown', this.setEventListeners.bind(this));
    window.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие поп-апа
  close() {
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  // поиск template
  _getTemplate() {
    const popup = document.querySelector(this._selector)
    return popup;    
  }

};