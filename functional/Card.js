
export class Card {
  constructor(templateSelector, item, handleCardClick){
    this._templateSelector = templateSelector;
    this._title = item.name;
    this._image = item.link;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
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
    const elementCardImage = this._element.querySelector('.elements__card-image');
    elementCardImage.src = this._image;
    elementCardImage.alt = this._title;
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
      this.removeCard();
    });

    // слушатель на кнопку-картинку
    this._buttonImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    // слушатель на кнопку лайка
    this._buttonLike.addEventListener('click', () => {
      this.changeLike();
    });
  };
  
  // смена вида лайка
  changeLike() {
    this._buttonLike.classList.toggle('elements__card-like_active');
  }

  // удаление карточки
  removeCard() {
    const item = this._buttonClose.closest('.elements__card');
    item.remove();
    this._element = null;
  }
}
