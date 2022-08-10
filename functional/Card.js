import {popupCardImage, popupCardTitle, popupCard} from './index.js';

class Card {
  constructor(templateSelector, item){
    this._templateSelector = templateSelector;
    this._title = item.name;
    this._image = item.link;
  }

  // todo добавление карточки в дерево DOM элементов

  // todo создание карточки

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__card-image').src = this._image;
    this._element.querySelector('.elements__card-title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._buttonClose = this._element.querySelector('#button-trash');
    this._cardButtonImage = this._element.querySelector('.elements__card-image-button');
    this._cardButtonLike = this._element.querySelector('.elements__card-like');
  
    //слушатель на кнопку удаления
    _buttonClose.addEventListener('click', () => {
      const item = _buttonClose.closest(this._templateSelector);
      item.remove();
    });

    //слушатель на кнопку-картинку
    _cardButtonImage.addEventListener('click', () => {
      popupCardImage.src = this._image;
      popupCardTitle.textContent = this._link;

      openPopup(popupCard);
    });
  }
}

