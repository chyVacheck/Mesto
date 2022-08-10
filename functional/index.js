// хочу сразу сказать ревьюеру: Дорогой челок, коментарии внизу я написал, больше себе, что бы не
// отходить от такого типа коментирования, и попытаться внедрить его е себе в жизнь, так что это не попытка
// общения с Вами, с целью сделать свою работу легче или как-то считерить, или что-то подобное, надеюсь это не доставит Вам неудобств :)


//*     для обозначения того, что мы делаем 100% (вне зависимости от действий пользователя код будет выполнен)
//*     объявления переменных какого-то блока (напрмер в шапке есть заголовок текст и еще что-то, они будут обьявлены под "//* header" )
//      для обозначения функций, который могут использоваться, а могут и не использоваться (зависит от пользователя)
//      объявления массивов
// todo для чего-то, что в будущем может быть понадобиться (надо будет раскоментировать)
//?     какие-то пояснения к функциям, или переменным (не потому что я тупой, а потому что так легче)

let page = document.querySelector('.page');
//todo let header = page.querySelector('.header');
let content = page.querySelector('.content');
//todo let footer = page.querySelector('.footer');

//* template
const templateCard = page.querySelector('#templateCard').content;
const templatePopup = page.querySelector('#templatePop-up').content;

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

//? cписок информации для всех карточек
let initialCards = [
  {
    name: 'Карачаевск',
    link: './images/cards/Karachaevsk.png',
    alt: 'Карачаевск'
  },
  {
    name: 'Золотые ворота',
    link: './images/cards/gold_gate.png',
    alt: 'Величественные Золотые ворота в Киеве'
  },
  {
    name: 'Карпаты',
    link: './images/cards/Karpatu.jpg',
    alt: 'Красивый гора Карпаты'
  },
  {
    name: 'Домбай',
    link: './images/cards/Dombay.jpg',
    alt: 'Домбай просто Домбай'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/cards/Gora_Elbrus.jpg',
    alt: 'Красивая гора Эльбрус'
  },
  {
    name: 'Франция',
    link: './images/cards/Franch.jpg',
    alt: 'Знаменитая Эльфеева башня'
  },
  {
    name: 'Одесса',
    link: './images/cards/Odessa-beach.jpg',
    alt: 'Красивый одесский пляж'
  }
]

//?если не было передано имя массива, то берем initialCards
//?если не было передано i то загружаем карточку из конца массива
// добавление новой карточки
function addNewCard(listOfCard = initialCards, i = listOfCard.length - 1) {
  let card = templateCard.cloneNode(true);
  let cardImage = card.querySelector('.elements__card-image');
  let cardTitle = card.querySelector('.elements__card-title');
  let cardTrashButton = card.querySelector('#trash-button');
  let cardLikeButton = card.querySelector('.elements__card-like');

  if (!(listOfCard[i].link === '') && !(listOfCard[i].link === 'Ссылка на картинку')) {
    cardImage.src = listOfCard[i].link;
    cardImage.alt = listOfCard[i].alt;
    cardTitle.textContent = listOfCard[i].name;
    elementsListCard.prepend(card);

    cardLikeButton.addEventListener('click', () => {
      cardLikeButton.classList.toggle('elements__card-like_active');
    });

    cardTrashButton.addEventListener('click', () => {
      const listItem = cardTrashButton.closest('.elements__card');
      listItem.remove();
    }); 
  }
  else {
    alert('Для добавление карточки, необходимо вставить ссылку на картику');
  }
  
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
