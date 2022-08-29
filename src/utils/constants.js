
//* import from components 
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

import { submitFormForPopupEdit, submitFormForPopupAdd } from '../pages/index.js';

export const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://images.unsplash.com/photo-1588584922681-745a2223f72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1619527441512-97d55b860d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Карпаты',
    link: 'https://images.unsplash.com/photo-1632087778661-26040de8b4ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Гора Петрос',
    link: 'https://images.unsplash.com/photo-1618380037378-6b7c28a8293a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1605248278520-2f5370c26b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1211&q=80'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Обское море',
    link: 'https://images.unsplash.com/photo-1595933868307-5a7083dfb921?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Одесский пляж',
    link: 'https://images.unsplash.com/photo-1596523965234-f45cda35d1e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Реслпублика Карелия',
    link: 'https://images.unsplash.com/photo-1630763741321-16e7bff61e2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1603787277977-0237f776f1ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
]

export const classPopupOpened = 'popup_opened';
export const selectorPopupButtonClose = '.popup__close-button';

export const form = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  activeButtonClass: 'popup__submit-button_valid',
  inactiveButtonClass: 'popup__submit-button_invalid',
  buttonClass: 'button',
  errorSelector: '.popup__error-mesage',
};

const page = document.querySelector('.page');

//* profile
export const user = new UserInfo({
  name: '.profile__nickname',
  info: '.profile__description',
});

const profile = page.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
// all buttons in profile
export const profileEditButton = profileInfo.querySelector('.profile__edit-button');   //button
export const profileAddNewCardButton = profile.querySelector('.profile__add-button');  //button

//* elements
export const cardListSection = '.elements__list-cards';

//* pop-up Edit
export const popupProfileEdit = new PopupWithForm('#popup-edit', submitFormForPopupEdit);

const popupEditForm = page.querySelector('#edit-popup-form');
export const objEditForm = new FormValidator(form, popupEditForm);

//* pop-up Add
export const popupCardAdd = new PopupWithForm('#popup-add', submitFormForPopupAdd);

const popupAddForm = page.querySelector('#add-popup-form');
export const objAddForm = new FormValidator(form, popupAddForm);

//* pop-up Card
export const popupWithImage = new PopupWithImage('#popup-card');

//* Object Section
export const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card('#template-сard', cardItem, () => {
        popupWithImage.open(cardItem.link, cardItem.name);
      });
      cardList.addItem(newCard.generateCard());
    },
  },
  cardListSection
);
