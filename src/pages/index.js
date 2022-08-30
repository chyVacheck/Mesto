
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js'

//* import from constants 
import {
  initialCards, form,
  profileEditButton, profileAddNewCardButton,
  popupEditForm, popupAddForm,

} from '../utils/constants.js';

//* profile
const user = new UserInfo({
  name: '.profile__nickname',
  info: '.profile__description',
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
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = createCard(cardItem);
      cardList.addItem(newCard);
    },
  },
  cardListSection
);

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
  const newCard = createCard(card);
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

cardList.renderItems();
