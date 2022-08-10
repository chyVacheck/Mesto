const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* template
const templateCard = page.querySelector('#template-сard').content;

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
const popupEdit = page.querySelector('#popup-edit');
const popupEditContainer = popupEdit.querySelector('#popup-edit-container');

const popupEditForm = popupEditContainer.querySelector('#edit-popup-form');
const popupEditFormName = popupEditForm.querySelector('#edit-input-name');
const popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');

const popupEditFormButtonSubmite = popupEditForm.querySelector('#button-submite');  //button
const popupEditButtonClose = popupEdit.querySelector('#edit-button-close');         //button

//* pop-up Add
const popupAdd = page.querySelector('#popup-add');
const popupAddContainer = popupAdd.querySelector('#popup-add-container');

const popupAddForm = popupAddContainer.querySelector('#add-popup-form');
const popupAddFormName = popupAddForm.querySelector('#add-input-name');
const popupAddFormInfo = popupAddForm.querySelector('#add-input-info');

const popupAddFormButtonSubmite = popupAddForm.querySelector('#add-button-submit');   //button
const popupAddButtonClose = popupAdd.querySelector('#add-button-close');              //button

//* pop-up Card
const popupCard = page.querySelector('#popup-card');
const popupCardContainer = popupCard.querySelector('#popup-card-container');
const popupCardImage = popupCard.querySelector('.popup__card-image');
const popupCardTitle = popupCard.querySelector('.popup__card-title');
const popupCardButtonClose = popupCard.querySelector('#card-button-close');     //button


/**
 * Добавляет модификатор к DOM элементу
 *
 * @param {DOM} popup DOM элемент, которому необходимо добавить модификатор
 */ 
function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closeWithClick);
  window.addEventListener('keydown', closeWithEscape);
}

/**
 * Убирает модификатор у DOM элемента
 *
 * @param {DOM} popup DOM элемент, которому необходимо добавить модификатор
 */ 
 function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeWithClick);
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
  addCard(popupAddFormName.value, popupAddFormInfo.value, elementsListCard);
  closePopup(popupAdd);
}

/**
 * Создает карточку
 * после чего передает card в функцию renderCard()
 * после чего закрывает popup-add
 * @param {string} name - имя изображения в карточки
 * @param {string} link - ссылка на изображение необходимое для карточки
 * 
 * @return {DOM} card - готовая карточка
 */
 function createCard(name, link){
  const card = templateCard.cloneNode(true);
  // обьявляем переменные (имя и картинка)
  const cardImage = card.querySelector('.elements__card-image');
  cardImage.src = link;
  cardImage.alt = name;
  const cardName = card.querySelector('.elements__card-title');
  cardName.textContent = name;
  // обьявляем константы (кнопки: удаления, картинки, лайка)
  const cardButtonTrash = card.querySelector('#button-trash');
  const cardButtonImage = card.querySelector('.elements__card-image-button');
  const cardButtonLike = card.querySelector('.elements__card-like');
  // слушатель на кнопку удаления
  cardButtonTrash.addEventListener('click', () => {
    const item = cardButtonTrash.closest('.elements__card');
    item.remove();
  });
  // слушатель на кнопку-картинку
  cardButtonImage.addEventListener('click', () =>{
    // меняем значения в pop-up на значения нашей карточки
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardName.textContent;
    popupCardTitle.textContent = cardName.textContent;
    //открытие
    openPopup(popupCard);
  });
  // слушатель на кнопку лайка
  cardButtonLike.addEventListener('click', () => {
    cardButtonLike.classList.toggle('elements__card-like_active');
  });
  return card;
}

/**
 * Добавляет карточку card в container
 * причем добавляет на первое место
 * @param {DOM} card - готовая карточка 
 * @param {string} container - псевдомассив
 */
 function renderCard(card, container){
  container.prepend(card);
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
  return page.querySelector(selectorPopupOpened);
}
function addCard(name, link, elementsListCard){
  const card = createCard(name, link);
  renderCard(card, elementsListCard);
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  //записываем в editFormInput значение из profile
  popupEditFormName.placeholder = profileNickname.textContent;
  popupEditFormInfo.placeholder = profileDescription.textContent;
  openPopup(popupEdit);
});
// слушатель на кнопку создания новой карточки
profileAddNewCardButton.addEventListener('click', () => {
  popupAddForm.reset();
  openPopup(popupAdd);
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
