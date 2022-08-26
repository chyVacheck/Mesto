
import { Card, FormValidator, Popup, PopupWithImage } from './utils.js';
import { initialCards, selectorPopupOpened, selectorPopupButtonClose, form } from './constants.js';

const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* profile
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileNickname = profileInfo.querySelector('.profile__nickname');
const profileDescription = profileInfo.querySelector('.profile__description');
// all buttons in profile
const profileEditButton = profileInfo.querySelector('.profile__edit-button');   //button
const profileAddNewCardButton = profile.querySelector('.profile__add-button');  //button

//* elements
const elements = content.querySelector('.elements');
const elementsListCard = elements.querySelector('.elements__list-cards');

//* pop-up Edit
let formEdit = {};
Object.assign(formEdit, form)
formEdit.formSelector = '#edit-popup-form';
const objEditForm = new FormValidator(formEdit);

const popupEdit = page.querySelector('#popup-edit');
const popupEditContainer = popupEdit.querySelector('#popup-edit-container');

const popupEditForm = popupEditContainer.querySelector('#edit-popup-form');
const popupEditFormName = popupEditForm.querySelector('#edit-input-name');
const popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');

//* pop-up Add
let formAdd = {};
Object.assign(formAdd, form)
formAdd.formSelector = '#add-popup-form';
const objAddForm = new FormValidator(formAdd);

const popupAdd = page.querySelector('#popup-add');
const popupAddContainer = popupAdd.querySelector('#popup-add-container');

const popupAddForm = popupAddContainer.querySelector('#add-popup-form');
const popupAddFormName = popupAddForm.querySelector('#add-input-name');
const popupAddFormInfo = popupAddForm.querySelector('#add-input-info');

//* pop-up Card
export const popupWithImage = new PopupWithImage('#popup-card');

const popupCard = page.querySelector('#popup-card');
const popupCardImage = popupCard.querySelector('.popup__card-image');
const popupCardTitle = popupCard.querySelector('.popup__card-title');


/**
 * Добавляет модификатор к DOM элементу
 *
 * @param {DOM} popup DOM элемент, которому необходимо добавить модификатор
 */ 
function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', closeWithClick);
  window.addEventListener('keydown', closeWithEscape);
}

/**
 * Убирает модификатор у DOM элемента
 *
 * @param {DOM} popup DOM элемент, которому необходимо добавить модификатор
 */ 
 function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closeWithClick);
  window.removeEventListener('keydown', closeWithEscape);
}

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */ 
 function submitFormForPopupEdit() {
  //перезаписываем значения в profileIndo взятое из popupEditForm...
  profileNickname.textContent = popupEditFormName.value;
  profileDescription.textContent = popupEditFormInfo.value;
  closePopup(popupEdit);
  objEditForm.form.reset();
}

/**
 * Сохраняет данные из form в popup-add и создает card
 * после чего передает card в функцию renderCard()
 * после чего закрывает popup-add
 * 
 * @param {DOM} evt //не уверен, что это DOM
 */ 
 function submitFormForPopupAdd(evt) {
  evt.preventDefault();
  //создаем карточку для добавления
  const card = {
    name: popupAddFormName.value,
    link: popupAddFormInfo.value,
  };
  createCard(card, elementsListCard);
  closePopup(popupAdd);

  popupAddForm.reset();
}

/**
 * Функция создания card и добавления ее в контейнер
 * @param {obj} card - обьект карточки которую нужно создать и добавить
 * @param {Element} elementsListCard - то куда нужно добавить карточку
 */
function createCard(card, elementsListCard){
  const newCard = new Card('#template-сard', {
    name: card.name,
    link: card.link,
  });
  newCard.generateCard();
  newCard.renderCard(elementsListCard);
}

/**
 * Вызывает функцию закрытия popup через нажатие конопки esc
 * @param {event} event - event
 */
function closeWithEscape (event) {
  if (event.key === 'Escape') {
    const popup = findOpenedPopup();
    closePopup(popup);
  }
}

/**
 * Вызывает функцию закрытия popup через клик мышей вне контейнера
 * @param {event} event - event
 */
 function closeWithClick (event) {
  const popup = findOpenedPopup();
  const buttonClose = popup.querySelector(selectorPopupButtonClose);
  if ((event.target === popup) || (event.target === buttonClose)) {
    closePopup(popup);
  }
}
//находим открытый popup по модификатору
function findOpenedPopup(){
  return document.querySelector(selectorPopupOpened);
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  //записываем в editFormInput значение из profile
  popupEditFormName.value = profileNickname.textContent;
  popupEditFormInfo.value = profileDescription.textContent;
  objEditForm.showError(popupEditFormName);
  objEditForm.showError(popupEditFormInfo);
  objEditForm.setSubmitButtonState(true);
  openPopup(popupEdit);
});

// слушатель на кнопку создания новой карточки
profileAddNewCardButton.addEventListener('click', () => {
  popupAddForm.reset();
  objAddForm.setSubmitButtonState(false);
  openPopup(popupAdd);
});

// слушатель на submit в popup редактирования
popupEditForm.addEventListener('submit', submitFormForPopupEdit);

// слушатель на submit в popup добавлении карточки
popupAddForm.addEventListener('submit', submitFormForPopupAdd);

//*загружаем на сайт карточки
initialCards.forEach(function (item) {
  createCard(item, elementsListCard);

});

//включаем валидацию на формы
objEditForm.enableValidation();
objAddForm.enableValidation();

