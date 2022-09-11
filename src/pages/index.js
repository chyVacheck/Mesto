
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
import { PopupDelete } from '../components/PopupDelete.js';

//* Object Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  headers: {
    authorization: "6e341995-26c2-4e13-90fe-459da74d1f67",
    "Content-Type": "application/json",
  },
})

const serverCardArray = []

//* profile
const user = new UserInfo({
  name: '.profile__nickname',
  about: '.profile__description',
  image: '.profile__avatar',
});

//берем имя из сервера и устанавливаем
api.getUserInfo().then((res) => {
  user.setUserInfo(res);
})

//* pop-up Edit // меняет имя и описание в профиле
const popupProfileEdit = new PopupWithForm('#popup-edit', submitFormForPopupEdit);

const objEditForm = new FormValidator(form, popupEditForm);

//* pop-up Add // добавляет карточку
const popupCardAdd = new PopupWithForm('#popup-add', submitFormForPopupAdd);

const objAddForm = new FormValidator(form, popupAddForm);

//* pop-up Delete // удаляет карточку
const popupDelete = new PopupDelete('#popup-delete', submitFormForPopupDelete);

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
    // console.log(cardItem)//todo потом удалить
    cardList.addItem(newCard);
  },
}, cardListSection);

popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
popupDelete.setEventListeners();
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

  api.setUserInfo(profileInfo)
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
  api.addNewCard(card)
    .then((res) => {
      const newCard = createCard(res);
      cardList.addItem(newCard);
    })
    .catch(error => console.log(`Ошибка: ${error}`))
  popupCardAdd.close();
}

/**
 * Удаляет карточку из DOM дерева,
 * а так же посылает на сервер запрос на удаление
 * карточки из массива карточек
 * 
 * @param {idCard} int // id карточки
 */
function submitFormForPopupDelete(evt) {
  evt.preventDefault();
  api.deleteCard(popupDelete.card.id);
  popupDelete.card.removeCard();
  popupDelete.close();
}

// функция по созданию DOM элемента карточки
function createCard(item) {
  const cardElement = new Card({
    item,
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    },
    handleLikeClick: () => {
      api.changeLike(item._id)
        .then((res) => {
          console.log(res);
        })
        .then((res) => {
          item = res;
        })

    },
    handleDeleteIconClick: (item) => {
      popupDelete.open(item);
    }
  },
    '#template-сard');
  const card = cardElement.generateCard();
  if (item.owner._id != user.id) {
    cardElement.buttonTrash.remove();
  }
  return card;
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

// включаем валидацию на формы
objEditForm.enableValidation();
objAddForm.enableValidation();

api.getCardArray()
  .then((res) => {
    res.forEach((element, index) => {
      serverCardArray[res.length - index] = element
    })
    cardList.renderItems();
    console.log('Массив был сохранен');
  })

