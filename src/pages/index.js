
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js'


//* import from constants 
import {
  form,
  profileEditButton, profileAddNewCardButton,
  popupEditForm, popupAddForm,
} from '../utils/constants.js';

//* Object Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/',
  headers: {
    authorization: "6e341995-26c2-4e13-90fe-459da74d1f67",
    "Content-Type": "application/json",
  },
})

//берем имя из сервера и устанавливаем
api.getUserInfo().then((res) => {
  user.setUserInfo({
    name: res.name,
    info: res.about
  })
})

const serverCardArray = []

//* profile
const user = new UserInfo({
  name: '.profile__nickname',
  info: '.profile__description',
  image: '.profile__avatar',
});

//* pop-up Edit
const popupProfileEdit = new PopupWithForm('#popup-edit', submitFormForPopupEdit);

const objEditForm = new FormValidator(form, popupEditForm);

//* pop-up Add
const popupCardAdd = new PopupWithForm('#popup-add', submitFormForPopupAdd);

const objAddForm = new FormValidator(form, popupAddForm);

//* pop-up Card
const popupWithImage = new PopupWithImage('#popup-card');

//* elements
const cardListSection = '.elements__list-cards';

//* Object Section
const cardList = new Section({
  // items: initialCards,
  items: serverCardArray,
  renderer: (cardItem) => {
    const newCard = createCard(cardItem);
    cardList.addItem(newCard);
  },
}, cardListSection);

popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
popupWithImage.setEventListeners();

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */
function submitFormForPopupEdit() {
  //перезаписываем значения в profileIndo взятое из popupEditForm...
  const profileInfo = popupProfileEdit.getInputValues()

  api.setUserInfo({
    name: profileInfo.name,
    about: profileInfo.info
  })
    .then((res) => {
      console.log('Имя успешно передано на сервер')
      return res.json()
    })
    .catch((error) => console.log(`Ошибка: ${error}`))

  user.setUserInfo(profileInfo);
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
  const newCard = createCard(card);
  api.addNewCard(card)
    .catch(error => console.log(`Ошибка: ${error}`))
  cardList.addItem(newCard);
  popupCardAdd.close();
}

function createCard(item) {
  const cardElement = new Card('#template-сard', item, () => {
    popupWithImage.open(item.link, item.name);
  });
  return cardElement.generateCard();
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupProfileEdit.setInputValues(user.getUserInfo());
  objEditForm.resetValidation();
  // objEditForm.setSubmitButtonState(true);
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

api.getCardArray()
  .then((res) => {
    res.forEach((element, index) => {
      serverCardArray[index] = element

    })
    cardList.renderItems();
    console.log('Массив был сохранен')
  })

