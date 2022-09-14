
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js'
import { selectorPopupButtonClose } from '../utils/constants.js';
import { classPopupOpened } from '../utils/constants.js';


//* import from constants 
import {
  form,
  profileEditButton, profileAddNewCardButton,
  popupEditForm, popupAddForm, popupAvatarForm
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
}, () => popupAvatar.open());
user.setEventListner();

//* pop-up Edit // меняет имя и описание в профиле
const popupProfileEdit = new PopupWithForm({
  popupSelector: '#popup-edit',
  classOpened: classPopupOpened,
  selectorButtonClose: selectorPopupButtonClose,
}, submitFormForPopupEdit);

const objEditForm = new FormValidator(form, popupEditForm);

//* pop-up Add // добавляет карточку
const popupCardAdd = new PopupWithForm({
  popupSelector: '#popup-add',
  classOpened: classPopupOpened,
  selectorButtonClose: selectorPopupButtonClose,
}, submitFormForPopupAdd);

const objAddForm = new FormValidator(form, popupAddForm);

//* pop-up Card
const popupWithImage = new PopupWithImage({
  popupSelector: '#popup-card',
  classOpened: classPopupOpened,
  selectorButtonClose: selectorPopupButtonClose,
});

//* pop-up Delete // удаляет карточку
const popupDelete = new PopupDelete({
  popupSelector: '#popup-delete',
  classOpened: classPopupOpened,
  selectorButtonClose: selectorPopupButtonClose,
}, submitFormForPopupDelete);

//* pop-up Avatar
const popupAvatar = new PopupWithForm({
  popupSelector: '#popup-avatar',
  classOpened: classPopupOpened,
  selectorButtonClose: selectorPopupButtonClose,
}, submitFormForPopupAvatar);

const objAvatarForm = new FormValidator(form, popupAvatarForm);

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
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */
function submitFormForPopupEdit() {
  //перезаписываем значения в profileIndo взятое из popupEditForm...
  popupProfileEdit.changeButtonText('Сохранение...');
  const profileInfo = popupProfileEdit.getInputValues()

  api.setUserInfo(profileInfo)
    .then((res) => {
      console.log('Имя успешно передано на сервер');
      console.log('');
      popupProfileEdit.close();
      user.setUserInfo(profileInfo);
      return res.json()
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      popupProfileEdit.changeButtonText('Сохранить');
    })
}

/**
 * Сохраняет данные из form в popup-add и создает card
 * после чего передает card в функцию renderCard()
 * после чего закрывает popup-add
 * 
 * @param {DOM} evt //не уверен, что это DOM
 */
function submitFormForPopupAdd(evt) {
  popupCardAdd.changeButtonText('Создание...');
  evt.preventDefault();
  const card = popupCardAdd.getInputValues();
  api.addNewCard(card)
    .then((res) => {
      const newCard = createCard(res);
      cardList.addItem(newCard);
      console.log('Карточка успешно создана и сохранена на сервере');
      console.log('');
      popupCardAdd.close();
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => {
      popupCardAdd.changeButtonText('Создать');
    })

}

/**
 * Удаляет карточку из DOM дерева,
 * а так же посылает на сервер запрос на удаление
 * карточки из массива карточек
 * 
 * @param {evt} evt 
 */
function submitFormForPopupDelete(evt) {
  evt.preventDefault();
  api.deleteCard(popupDelete.card)
    .then(() => {
      popupDelete.card.removeCard();
      popupDelete.close();
      console.log('Карточка удалена');
      console.log('');
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
}

/**
 * Меняет ссылку фото аватара у пользователя 
 * на введенную в поле формы ссылку
 * 
 * @param {evt} evt
 */
function submitFormForPopupAvatar(evt) {
  popupAvatar.changeButtonText('Сохранение...');
  evt.preventDefault();
  const info = popupAvatar.getInputValues();
  api.setUserAvatar(info.avatar)
    .then((res) => {
      popupAvatar.close();
      user.setUserAvatar(res.avatar);
      popupAvatar.changeButtonText('Сохранить');
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupAvatar.changeButtonText('Сохранить'))
}

// функция по созданию DOM элемента карточки
function createCard(item) {
  const cardElement = new Card({
    item,
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    },
    handleLikeClick: () => {
      api.changeLike(item, user._id)
        .then((res) => {
          item.likes = res.likes;
          cardElement.elementCardLikes.textContent = res.likes.length;
        })
        .then(() => {
          cardElement.changeLike();
          console.log('Поставили/убрали лайк');
          console.log('');
        })
        .catch((error) => {
          return console.log(`Ошибка: ${error}`);
        })

    },
    handleDeleteIconClick: (item) => {
      popupDelete.open(item);
    }
  },
    '#template-сard');
  //* удаляем кнопку муссорки у чюжих карточек
  const card = cardElement.generateCard();
  if (item.owner._id != user._id) {
    cardElement.buttonTrash.remove();
  }
  //* ставим лайк если в списке лайкнувших есть id пользователя
  item.likes.forEach((item) => {
    if (item._id == user._id) {
      cardElement.changeLike();
    }
  })
  return card;
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupProfileEdit.setInputValues(user.getUserInfo());
  objEditForm.resetValidation();
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
objAvatarForm.enableValidation();

Promise.all([api.getUserInfo(), api.getCardArray()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    user.setUserInfo(userData);
    user.setUserAvatar(userData.avatar);
    console.log('Имя, описание и аватарка успешно получены с сервера');
    console.log('');
    // и тут отрисовка карточек
    cards.forEach((element, index) => {
      serverCardArray[cards.length - index] = element
    })
    cardList.renderItems();
    console.log('Массив был сохранен');
    console.log('');
  })
  .catch(err => console.log(`Ошибка: ${err}`));
