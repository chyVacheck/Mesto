
export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = data.item.name;
    this._image = data.item.link;
    this.likes = data.item.likes;
    this._id = data.item._id;
    this._element = this._getTemplate();

    this._handleCardClick = data.handleCardClick;
    this._handleLikeClick = data.handleLikeClick;
    this._handleDeleteIconClick = data.handleDeleteIconClick;

    this.elementCardLikes = this._element.querySelector('.elements__card-like-number');
    // buttons
    this.buttonTrash = this._element.querySelector('#button-trash');
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
    this.elementCardLikes.textContent = this.likes.length;
    this._element.querySelector('.elements__card-title').textContent = this._title;

    return this._element;
  }

  // слушатели на кнопки
  _setEventListeners() {

    // слушатель на кнопку удаления
    this.buttonTrash.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    // слушатель на кнопку-картинку
    this._buttonImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    // слушатель на кнопку лайка
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  };

  // смена вида лайка
  changeLike() {
    this._buttonLike.classList.toggle('elements__card-like_active');
  }

  // удаление карточки
  removeCard() {
    const item = this.buttonTrash.closest('.elements__card');
    item.remove();
    this._element = null;
  }
}

