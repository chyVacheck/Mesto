import {popupCardImage, popupCardTitle, popupCard} from './index.js';
import {openPopup} from './index.js';

export class Card {
  constructor(templateSelector, item){
    this._templateSelector = templateSelector;
    this._title = item.name;
    this._image = item.link;
    this._element = this._getTemplate();
    // buttons
    this._buttonClose = this._element.querySelector('#button-trash');
    this._buttonImage = this._element.querySelector('.elements__card-image-button');
    this._buttonLike = this._element.querySelector('#button-like');
  }

  // поиск template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content
    .cloneNode(true);
    return cardElement;
  }

  // создание карточки
  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.elements__card-image').src = this._image;
    this._element.querySelector('.elements__card-image').alt = this._title;
    this._element.querySelector('.elements__card-title').textContent = this._title;

    return this._element;
  }

  // слушатели на кнопки
  renderCard(container){
    container.prepend(this._element);
  }
  
  // слушатели на кнопки
  _setEventListeners() {
  
    // слушатель на кнопку удаления
    this._buttonClose.addEventListener('click', () => {
      const item = this._buttonClose.closest('.elements__card');
      item.remove();
    });

    // слушатель на кнопку-картинку
    this._buttonImage.addEventListener('click', () => {
      popupCardImage.src = this._image;
      popupCardTitle.textContent = this._title;

      openPopup(popupCard);
    });

    // слушатель на кнопку лайка
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('elements__card-like_active');
  });
  }
}
