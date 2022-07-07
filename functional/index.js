const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* template
const templateCard = page.querySelector('#templateCard').content;

//* profile
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileNickname = profileInfo.querySelector('.profile__nickname');
const profileDescription = profileInfo.querySelector('.profile__description');
// all buttons in profile
const profileEditButton = profileInfo.querySelector('.profile__edit-button'); //button
const profileAddButton = profile.querySelector('.profile__add-button');       //button

//* elements
const elements = content.querySelector('.elements');
const elementsListCard = elements.querySelector('.elements__list-cards');

//* pop-up
const popup = page.querySelector('#popup')

//* pop-up Edit
const popupEdit = popup.querySelector('#edit-popup');
const popupEditForm = popupEdit.querySelector('#edit-popup-form');
let popupEditFormName = popupEditForm.querySelector('#edit-input-name');
let popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');
const popupEditFormButtonSubmite = popupEdit.querySelector('#button-submite');  //button
const popupEditButtonClose = popupEdit.querySelector('#edit-button-close');

//* pop-up Add
const popupAdd = popup.querySelector('#add-popup');
const popupAddForm = popupAdd.querySelector('#add-popup-form');
const popupAddFormName = popupAddForm.querySelector('#add-input-name');
const popupAddFormInfo = popupAddForm.querySelector('#add-input-info');
const popupAddFormButtonSubmite = popupAdd.querySelector('#add-button-submite');//button
const popupAddButtonClose = popupAdd.querySelector('#add-button-close');        //button

//* pop-up Card
const popupCard = popup.querySelector('#card-popup');
const popupCardImage = popupCard.querySelector('.popup__card-image');
const popupCardTitle = popupCard.querySelector('.popup__card-title');
const popupCardButtonClose = popupCard.querySelector('#card-button-close');     //button


/**
 * Добавляет модификатор к DOM элементу
 *
 * @param {DOM} popupContainer DOM элемент, которому необходимо добавить модификатор
 */ 
function openPopup(popupContainer) {
  popup.classList.add('popup_opened');
  if (popupContainer === popupCard) {
    popup.classList.add('popup_background_darknes');
    popupContainer.classList.add('popup__card_opened');
  } else {
    popupContainer.classList.add('popup__container_opened');
  }
  
  
}

/**
 * Убирает модификатор к DOM элементу
 *
 * @param {DOM} popupContainer DOM элемент, у которого необходимо убрать модификатор
 */ 
function closePopup(popupContainer) {
  popup.classList.remove('popup_opened');
  if (popupContainer === popupCard) {
    popup.classList.remove('popup_background_darknes');
    popupContainer.classList.remove('popup__card_opened');
  } else {
    popupContainer.classList.remove('popup__container_opened');
  }
}

/**
 * Сохраняет данные из form в popup-edit и перезаписывает их profile
 * После чего закрывает popup-edit
 * 
 * @param {вроде как сам элемент} evt 
 */ 
function formSubmitForPopupEdit(evt) {
  evt.preventDefault();
  //обновляем значение form, для получения новых значений 
  popupEditFormName = popupEditForm.querySelector('#edit-input-name');
  popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');
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
function formSubmitForPopupAdd(evt) {
  evt.preventDefault();
  //создаем карточку для добавления
  const card = createCard(popupAddFormName.value, popupAddFormInfo.value);
  renderCard(card, elementsListCard);
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
    popupCardTitle.textContent = cardName.textContent;
    openPopup(popupCard);
  });
  // слушатель на кнопку лайка
  cardButtonLike.addEventListener('click', () => {
    cardButtonLike.classList.toggle('elements__card-like_active');
  });
  return card;
}

/**
 * Добавляет карточку card в conteiner
 * причем добавляет на первое место
 * @param {DOM} card - готовая карточка 
 * @param {string} conteiner - псевдомассив
 */
function renderCard(card, conteiner){
  conteiner.prepend(card);
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  //записываем в editFormInput значение из profile
  popupEditFormName.placeholder = profileNickname.textContent;
  popupEditFormInfo.placeholder = profileDescription.textContent;
  openPopup(popupEdit);
});
// слушатель на кнопку создания новой карточки
profileAddButton.addEventListener('click', () => {
  popupAddFormName.value = '';
  popupAddFormInfo.value = '';
  openPopup(popupAdd);
});
// слушатель на кнопку закрытия popup редактирования
popupEditButtonClose.addEventListener('click', () => {
  closePopup(popupEdit);
});
// слушатель на кнопку закрытия popup создания
popupAddButtonClose.addEventListener('click', () => {
  closePopup(popupAdd);
});
// слушатель на кнопку закрытия popup карточки
popupCardButtonClose.addEventListener('click', () => {
  closePopup(popupCard);
});

// слушатель на submit в popup редактирования
popupEditForm.addEventListener('submit', formSubmitForPopupEdit);
// слушатель на submit в popup добавлении карточки
popupAddForm.addEventListener('submit', formSubmitForPopupAdd);

//*загружаем на сайт карточки
initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link);
  renderCard(card, elementsListCard);
});