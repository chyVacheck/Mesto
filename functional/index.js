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
const templatePopupForm = page.querySelector('#templatePop-upForm').content;
const templatePopupCard = page.querySelector('#templatePop-upCard').content;

//* profile
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
let profileNickname = profileInfo.querySelector('.profile__nickname');
let profileDescription = profileInfo.querySelector('.profile__description');

const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

//* pop-up Edit
const popupEdit = templatePopupForm.cloneNode(true);
popupEdit.querySelector('.popup').id = 'edit-popup';
let popupEditTitle = popupEdit.querySelector('.popup__title');
popupEditTitle.textContent = 'Редактировать профиль';
const popupEditForm = popupEdit.querySelector('#popup__form');
let popupEditFormName = popupEditForm.querySelector('#input-name');
let popupEditFormInfo = popupEditForm.querySelector('#input-info');
const popupEditFormButtonSubmite = popupEdit.querySelector('#button-submite');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');

//* pop-up Add
const popupAdd = templatePopupForm.cloneNode(true);
popupAdd.querySelector('.popup').id = 'add-popup';
let popupAddTitle = popupAdd.querySelector('.popup__title');
popupAddTitle.textContent = 'Новое место';
const popupAddForm = popupAdd.querySelector('#popup__form');
let popupAddFormName = popupAddForm.querySelector('#input-name');
popupAddFormName.value = 'Название';
let popupAddFormInfo = popupAddForm.querySelector('#input-info');
popupAddFormInfo.value = 'Ссылка на картинку';
const popupAddFormButtonSubmite = popupAdd.querySelector('#button-submite');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');

//* pop-up Card
const popupCard = templatePopupCard.cloneNode(true);
popupCard.querySelector('.popup').id = 'card-popup';
let popupCardImage = popupCard.querySelector('.popup__card-image');
let popupCardTitle = popupCard.querySelector('.popup__card-title');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');


page.append(popupEdit);
page.append(popupAdd);
page.append(popupCard);

profileEditButton.addEventListener('click', () => {
  popupEditFormName.value = profileNickname.textContent;
  popupEditFormInfo.value = profileDescription.textContent;
  openPopup('#edit-popup', popupEditFormName.value, popupEditFormInfo.value, 'Сохранить');
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup('#edit-popup');
});

profileAddButton.addEventListener('click', () => {
  popupAddFormName.value = 'Название';
  popupAddFormInfo.value = 'Ссылка на картинку';
  openPopup('#add-popup', popupAddFormName.value, popupAddFormInfo.value, 'Создать');
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup('#add-popup');
});

popupCardCloseButton.addEventListener('click', () => {
  closePopup('#card-popup');
});

popupEditForm.addEventListener('submit', formSubmitHandler);
popupAddForm.addEventListener('submit', formSubmitForCard);

// размещение инфы из inputov, в профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  let popupEditFormName = popupEditForm.querySelector('#input-name');
  let popupEditFormInfo = popupEditForm.querySelector('#input-info');

  profileNickname.textContent = popupEditFormName.value;
  profileDescription.textContent = popupEditFormInfo.value;
  closePopup('#edit-popup');
}

// добавление новой карточки
function formSubmitForCard(evt) {
  evt.preventDefault();
  let popupAddFormName = popupAddForm.querySelector('#input-name');
  let popupAddFormInfo = popupAddForm.querySelector('#input-info');

  let card = [{
    name: popupAddFormName.value,
    link: popupAddFormInfo.value
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

// открытие карточки на весь экран
function openPopupCard(imageSrc, title) {
  const popup = document.querySelector('#card-popup');
  popupCardImage.src = imageSrc;
  popupCardTitle.textContent = title;

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
    link: 'https://images.unsplash.com/photo-1588584922681-745a2223f72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1619527441512-97d55b860d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Карпаты',
    link: 'https://images.unsplash.com/photo-1632087778661-26040de8b4ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Гора Петрос',
    link: 'https://images.unsplash.com/photo-1618380037378-6b7c28a8293a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1605248278520-2f5370c26b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1211&q=80'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Обское море',
    link: 'https://images.unsplash.com/photo-1595933868307-5a7083dfb921?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Одесский пляж',
    link: 'https://images.unsplash.com/photo-1596523965234-f45cda35d1e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  {
    name: 'Реслпублика Карелия',
    link: 'https://images.unsplash.com/photo-1630763741321-16e7bff61e2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1603787277977-0237f776f1ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
]

//?если не было передано имя массива, то берем initialCards
//?если не было передано i то загружаем карточку из конца массива
// добавление новой карточки
function addNewCard(listOfCard = initialCards, i = listOfCard.length - 1) {
  let card = templateCard.cloneNode(true);
  let cardImageButton = card.querySelector('.elements__card-image-button');
  let cardImage = card.querySelector('.elements__card-image');
  let cardTitle = card.querySelector('.elements__card-title');
  let cardTrashButton = card.querySelector('#trash-button');
  let cardLikeButton = card.querySelector('.elements__card-like');

  if (!(listOfCard[i].link === '') && !(listOfCard[i].link === 'Ссылка на картинку')) {
    cardImage.src = listOfCard[i].link;
    cardTitle.textContent = listOfCard[i].name;
    elementsListCard.prepend(card);

    cardImageButton.addEventListener('click', () => {
      openPopupCard(cardImage.src, cardTitle.textContent);
    });

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

//*загружаем на сайт карточки
for (let i = 0; i < initialCards.length; i++) {
  addNewCard(initialCards, i);
};
