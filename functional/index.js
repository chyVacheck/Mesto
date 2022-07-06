// хочу сразу сказать ревьюеру: Дорогой челок, коментарии внизу я написал, больше себе, что бы не
// отходить от такого типа коментирования, и попытаться внедрить его е себе в жизнь, так что это не попытка
// общения с Вами, с целью сделать свою работу легче или как-то считерить, или что-то подобное, надеюсь это не доставит Вам неудобств :)


//*     для обозначения того, что мы делаем 100% (вне зависимости от действий пользователя код будет выполнен)
//*     объявления переменных какого-то блока (напрмер в шапке есть заголовок текст и еще что-то, они будут обьявлены под "//* header" )
//      для обозначения функций, который могут использоваться, а могут и не использоваться (зависит от пользователя)
//      объявления массивов
//?     какие-то пояснения к функциям, или переменным (не потому что я тупой, а потому что так легче)

const page = document.querySelector('.page');
const content = page.querySelector('.content');

//* template
const templateCard = page.querySelector('#templateCard').content;

//* profile
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
let profileNickname = profileInfo.querySelector('.profile__nickname');
let profileDescription = profileInfo.querySelector('.profile__description');

const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

//* elements
const elements = content.querySelector('.elements');
const elementsListCard = elements.querySelector('.elements__list-cards');


//* pop-up Edit
const popupEdit = page.querySelector('#edit-popup');
const popupEditForm = popupEdit.querySelector('#edit-popup-form');
let popupEditFormName = popupEditForm.querySelector('#edit-input-name');
let popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');
const popupEditFormButtonSubmite = popupEdit.querySelector('#button-submite');
const popupEditCloseButton = popupEdit.querySelector('#edit-button-close');

//* pop-up Add
const popupAdd = page.querySelector('#add-popup');
const popupAddForm = popupAdd.querySelector('#add-popup-form');
let popupAddFormName = popupAddForm.querySelector('#add-input-name');
popupAddFormName.value = 'Название';
let popupAddFormInfo = popupAddForm.querySelector('#add-input-info');
popupAddFormInfo.value = 'Ссылка на картинку';
const popupAddFormButtonSubmite = popupAdd.querySelector('#add-button-submite');
const popupAddCloseButton = popupAdd.querySelector('#add-button-close');

//* pop-up Card
const popupCard = page.querySelector('#card-popup');
let popupCardImage = popupCard.querySelector('.popup__card-image');
let popupCardTitle = popupCard.querySelector('.popup__card-title');
const popupCardCloseButton = popupCard.querySelector('#card-button-close');

page.append(popupEdit);
page.append(popupAdd);
page.append(popupCard);

// функция по открытию popup
function openPopup(popup) {
  popup.classList.add('popup_opened')
}
// функция по закрытию popup
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}
// функция подтверждения в popup-edit
function formSubmitForPopupEdit(evt) {
  evt.preventDefault();
  popupEditFormName = popupEditForm.querySelector('#edit-input-name');
  popupEditFormInfo = popupEditForm.querySelector('#edit-input-info');

  profileNickname.textContent = popupEditFormName.value;
  profileDescription.textContent = popupEditFormInfo.value;
  closePopup(popupEdit);
}
// функция подтверждения в popup-add
function formSubmitForPopupAdd(evt) {
  evt.preventDefault();
  const card = createCard(popupAddFormName.value, popupAddFormInfo.value);
  renderCard(card, elementsListCard);
  closePopup(popupAdd);
}
// создание карточки
function createCard(name, link){
  const card = templateCard.cloneNode(true);
  // обьявляем переменные (имя и картинка)
  let cardImage = card.querySelector('.elements__card-image');
  cardImage.src = link;
  let cardName = card.querySelector('.elements__card-title');
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
// добавленик карточки в список
function renderCard(card, conteiner){
  conteiner.prepend(card);
}

// слушатель на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupEditFormName.value = profileNickname.textContent;
  popupEditFormInfo.value = profileDescription.textContent;
  openPopup(popupEdit);
});
// слушатель на кнопку создания новой карточки
profileAddButton.addEventListener('click', () => {
  popupAddFormName.value = 'Название';
  popupAddFormInfo.value = 'Ссылка на картинку';
  openPopup(popupAdd);
});
// слушатель на кнопку закрытия popup редактирования
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
// слушатель на кнопку закрытия popup создания
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});
// слушатель на кнопку закрытия popup карточки
popupCardCloseButton.addEventListener('click', () => {
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