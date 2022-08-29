
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
// import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

//* import from constants 
import { initialCards, form } from '../utils/constants.js';

const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* profile
const user = new UserInfo({
  name: '.profile__nickname',
  info: '.profile__description',
});

const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
// all buttons in profile
const profileEditButton = profileInfo.querySelector('.profile__edit-button');   //button
const profileAddNewCardButton = profile.querySelector('.profile__add-button');  //button

//* elements
const cardListSection = '.elements__list-cards';
const elements = content.querySelector('.elements');
const elementsListCard = elements.querySelector(cardListSection);

//* pop-up Edit
const popupProfileEdit = new PopupWithForm('#popup-edit', submitFormForPopupEdit);
popupProfileEdit.setEventListeners();

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
const popupCardAdd = new PopupWithForm('#popup-add', submitFormForPopupAdd);
popupCardAdd.setEventListeners();

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
  user.setUserInfo({
    name: popupEditFormName.value,
    info: popupEditFormInfo.value,
  });
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
  const card = {
    name: popupAddFormName.value,
    link: popupAddFormInfo.value,
  }
  //создаем карточку для добавления
  const newCard = new Card('#template-сard', card, () => {
    popupWithImage.open(card.link, card.name);
  });
  cardList.addItem(newCard.generateCard());
  popupCardAdd.close();
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  //записываем в editFormInput значение из profile
  popupEditFormName.value = userInfo.name;
  popupEditFormInfo.value = userInfo.info;
  objEditForm.showError(popupEditFormName);
  objEditForm.showError(popupEditFormInfo);
  objEditForm.setSubmitButtonState(true);
  popupProfileEdit.open();
});

// слушатель на кнопку создания новой карточки
profileAddNewCardButton.addEventListener('click', () => {
  popupCardAdd.form.reset();
  objAddForm.setSubmitButtonState(false);
  popupCardAdd.open();
});


//включаем валидацию на формы
objEditForm.enableValidation();
objAddForm.enableValidation();

cardList.renderItems();
