
import '/src/pages/index.css'; // добавьте импорт главного файла стилей

//* import from components 
import { Card } from '../components/Card.js';

//* import from constants 
import {
  user,
  profileEditButton, profileAddNewCardButton,
  popupProfileEdit, objEditForm,
  popupCardAdd, objAddForm,
  popupWithImage,
  cardList,

} from '../utils/constants.js';

popupProfileEdit.setEventListeners();

popupCardAdd.setEventListeners();

popupWithImage.setEventListeners();

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */
export function submitFormForPopupEdit() {
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
export function submitFormForPopupAdd(evt) {
  evt.preventDefault();
  const card = popupCardAdd.getInputValues();
  const newCard = createCard(card);
  cardList.addItem(newCard);
  popupCardAdd.close();
}

export function createCard(item) {
  const cardElement = new Card('#template-сard', item, () => {
    popupWithImage.open(item.link, item.name);
  });
  return cardElement.generateCard();
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
