
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

//* import from constants 
import { initialCards, form } from '../utils/constants.js';

const page = document.querySelector('.page');

//* profile
const user = new UserInfo({
  name: '.profile__nickname',
  info: '.profile__description',
});

const profile = page.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
// all buttons in profile
const profileEditButton = profileInfo.querySelector('.profile__edit-button');   //button
const profileAddNewCardButton = profile.querySelector('.profile__add-button');  //button

//* elements
const cardListSection = '.elements__list-cards';

//* pop-up Edit
const popupProfileEdit = new PopupWithForm('#popup-edit', submitFormForPopupEdit);
popupProfileEdit.setEventListeners();

const popupEditForm = page.querySelector('#edit-popup-form');
const objEditForm = new FormValidator(form, popupEditForm);

//* pop-up Add
const popupCardAdd = new PopupWithForm('#popup-add', submitFormForPopupAdd);
popupCardAdd.setEventListeners();

const popupAddForm = page.querySelector('#add-popup-form');
const objAddForm = new FormValidator(form, popupAddForm);

//* pop-up Card
const popupWithImage = new PopupWithImage('#popup-card');
popupWithImage.setEventListeners();

//* Object Section
const cardList = new Section(
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

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */
function submitFormForPopupEdit() {
  //перезаписываем значения в profileIndo взятое из popupEditForm...
  user.setUserInfo(popupProfileEdit.getInputValues());
  popupProfileEdit.close();
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
  const card = popupCardAdd.getInputValues();
  //создаем карточку для добавления
  const newCard = new Card('#template-сard', card, () => {
    popupWithImage.open(card.link, card.name);
  });
  cardList.addItem(newCard.generateCard());
  popupCardAdd.close();
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupProfileEdit.setInputValues(user.getUserInfo());
  objEditForm.resetValidation();
  objEditForm.setSubmitButtonState(true);
  popupProfileEdit.open();
});

// слушатель на кнопку создания новой карточки
profileAddNewCardButton.addEventListener('click', () => {
  objAddForm.resetValidation();
  popupCardAdd.open();
});

//включаем валидацию на формы
objEditForm.enableValidation();
objAddForm.enableValidation();

cardList.renderItems();
