const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* template
const templateCard = page.querySelector('#template-сard').content;

//* profile
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
let profileNickname = profileInfo.querySelector('.profile__nickname');
let profileDescription = profileInfo.querySelector('.profile__description');

const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

//* pop-up
const popup = page.querySelector('.popup');

const popupEdit = templatePopup.cloneNode(true);
const popupAdd = templatePopup.cloneNode(true);
popupEdit.querySelector('.popup').id = 'edit-popup';
popupAdd.querySelector('.popup').id = 'add-popup';
let popupEditTitle = popupEdit.querySelector('.popup__title');
let popupAddTitle = popupAdd.querySelector('.popup__title');
popupEditTitle.textContent = 'Редактировать профиль';
popupAddTitle.textContent = 'Новое место';
const popupEditForm = popupEdit.querySelector('#popup__form');
const popupAddForm = popupAdd.querySelector('#popup__form');
let popupEditFormName = popupEditForm.querySelector('#input-name');
let popupAddFormName = popupAddForm.querySelector('#input-name');
//! popupEditFormName.value = profileNickname.textContent;
popupAddFormName.value = 'Название';
let popupEditFormInfo = popupEditForm.querySelector('#input-info');
let popupAddFormInfo = popupAddForm.querySelector('#input-info');
//! popupEditFormInfo.value = profileDescription.textContent;
popupAddFormInfo.value = 'Ссылка на картинку';
const popupEditFormButtonSubmite = popupEdit.querySelector('#button-submite');
const popupAddFormButtonSubmite = popupAdd.querySelector('#button-submite');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');


page.append(popupEdit);
page.append(popupAdd);

profileEditButton.addEventListener('click', () => {
  popupEditFormName.value = profileNickname.textContent;
  popupEditFormInfo.value = profileDescription.textContent;
  openPopup('#edit-popup', popupEditFormName.value, popupEditFormInfo.value, 'Сохранить');
});

profileAddButton.addEventListener('click', () => {
  popupAddFormName.value = 'Название';
  popupAddFormInfo.value = 'Ссылка на картинку';
  openPopup('#add-popup', popupAddFormName.value, popupAddFormInfo.value, 'Создать');
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup('#edit-popup');
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup('#add-popup');
});

popupEditForm.addEventListener('submit', formSubmitHandler);
popupAddForm.addEventListener('submit', formSubmitForCard);

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */ 
function submitFormForPopupEdit(evt) {
  evt.preventDefault();
  let popupEditFormName = popupEditForm.querySelector('#input-name');
  let popupEditFormInfo = popupEditForm.querySelector('#input-info');

  profileNickname.textContent = popupEditFormName.value;
  profileDescription.textContent = popupEditFormInfo.value;
  closePopup('#edit-popup');
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
  let popupAddFormName = popupAddForm.querySelector('#input-name');
  let popupAddFormInfo = popupAddForm.querySelector('#input-info');

  let card = [{
    name: popupAddFormName.value,
    link: popupAddFormInfo.value,
    alt: popupAddFormName.value
  }]

  addNewCard(card);
  closePopup('#add-popup');
}

// открытие pop-up
function openPopup(idOfPopup, name, info, submite) {
  const popup = document.querySelector(idOfPopup);
  popup.querySelector('#input-name').value = name;
  popup.querySelector('#input-info').value = info;
  popup.querySelector('#button-submite').textContent = submite;

  popup.classList.add('popup_opened');
}

// закрытие pop-up
function closePopup(idOfPopup) {
  const popup = document.querySelector(idOfPopup);
  popup.classList.remove('popup_opened');
}

//* elements
const elements = content.querySelector('.elements');
const elementsListCard = elements.querySelector('.elements__list-cards');

//* pop-up Edit
const popupEdit = page.querySelector('#popup-edit');
const popupEditContainer = popupEdit.querySelector('#popup-edit-container');

const popupEditForm = popupEditContainer.querySelector('#edit-popup-form');
const popupEditFormName = popupEditForm.querySelector('#edit-input-name');
const popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');

const popupEditFormButtonSubmite = popupEditForm.querySelector('#button-submite');  //button
const popupEditButtonClose = popupEdit.querySelector('#edit-button-close');

//* pop-up Add
const popupAdd = page.querySelector('#popup-add');
const popupAddContainer = popupAdd.querySelector('#popup-add-container');

const popupAddForm = popupAddContainer.querySelector('#add-popup-form');
const popupAddFormName = popupAddForm.querySelector('#add-input-name');
const popupAddFormInfo = popupAddForm.querySelector('#add-input-info');

const popupAddFormButtonSubmite = popupAddForm.querySelector('#add-button-submit');//button
const popupAddButtonClose = popupAdd.querySelector('#add-button-close');        //button

//* pop-up Card
const popupCard = page.querySelector('#popup-card');
const popupCardContainer = popupCard.querySelector('#popup-card-container');
const popupCardImage = popupCard.querySelector('.popup__card-image');
const popupCardTitle = popupCard.querySelector('.popup__card-title');
const popupCardButtonClose = popupCard.querySelector('#card-button-close');     //button


/**
 * Добавляет модификатор к DOM элементу
 *
 * @param {DOM} popupContainer DOM элемент, которому необходимо добавить модификатор
 */ 
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeWithClick);
  window.addEventListener('keydown', closeWithEscape);
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  //записываем в editFormInput значение из profile
  popupEditFormName.placeholder = profileNickname.textContent;
  popupEditFormInfo.placeholder = profileDescription.textContent;
  popupEdit.classList.add('popup__container_opened');
  openPopup(popup);
  enableTap();
});
// слушатель на кнопку создания новой карточки
profileAddButton.addEventListener('click', () => {
  popupAddForm.reset();
  popupAdd.classList.add('popup__container_opened');
  openPopup(popup);
  enableTap();
});
// слушатель на кнопку закрытия popup редактирования
popupEditButtonClose.addEventListener('click', () => {
  popupEdit.classList.remove('popup__container_opened');
  closePopup(popup);
});
// слушатель на кнопку закрытия popup создания
popupAddButtonClose.addEventListener('click', () => {
  popupAdd.classList.remove('popup__container_opened');
  closePopup(popup);
});
// слушатель на кнопку закрытия popup карточки
popupCardButtonClose.addEventListener('click', () => {
  popup.classList.remove('popup_background_darknes');
  popupCard.classList.remove('popup__card_opened');
  closePopup(popup);
});

// слушатель на submit в popup редактирования
popupEditForm.addEventListener('submit', submitFormForPopupEdit);
// слушатель на submit в popup добавлении карточки
popupAddForm.addEventListener('submit', submitFormForPopupAdd);

//*загружаем на сайт карточки
initialCards.forEach(function (item) {
  addCard(item.name, item.link, elementsListCard);
});



// export { popupCardImage, popupCardTitle, popupCard }
