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

//* pop-up
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
let popupForm = popup.querySelector('#popup__form');
let popupInputNickname = popupForm.querySelector('#input-nickname');
let popupInputDescription = popupForm.querySelector('#input-description');

//* template
let templateCard = document.querySelector('#templateCard').content;

//* profile
let profile = content.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let profileNickname = profileInfo.querySelector('.profile__nickname');
let profileDescription = profileInfo.querySelector('.profile__description');

let profileEditButton = profileInfo.querySelector('.profile__edit-button');
//todo let profileAddButton = profile.querySelector('.profile__add-button');

//* elements
let elements = content.querySelector('.elements');
let elementsListCard = elements.querySelector('.elements__list-cards');
let ElementsCardArray = elementsListCard.querySelectorAll('.elements__card'); //? псевдомассив карточек
ElementsCardArray = Array.from(ElementsCardArray); //? массив карточек

//? cписок информации для всех карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/cards/Karachaevsk.png'
  },
  {
    name: 'Золотые ворота',
    link: './images/cards/gold_gate.png'
  },
  {
    name: 'Карпаты',
    link: './images/cards/Karpatu.jpg'
  },
  {
    name: 'Домбай',
    link: './images/cards/Dombay.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/cards/Gora_Elbrus.jpg'
  },
  {
    name: 'Франция',
    link: './images/cards/Franch.jpg'
  },
  {
    name: 'Одесса',
    link: './images/cards/Odessa-beach.jpg'
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
  cardImage.src = listOfCard[i].link;
  cardTitle.textContent = listOfCard[i].name;
  elementsListCard.append(card);


  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('elements__card-like_active');
  });


  cardTrashButton.addEventListener('click', () => {
    const listItem = cardTrashButton.closest('.elements__card');
    listItem.remove();
  }); 
}

//*загружаем на сайт карточки
for (let i = 0; i < initialCards.length; i++) {
  addNewCard(initialCards, i);
};

// открытие поп-апа
function openPopup() {
  popupInputNickname.value = profileNickname.textContent;
  popupInputDescription.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

// закрытие поп-апа
function closePopup() {
  popup.classList.remove('popup_opened');
}

// размещение инфы из inputov, в профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  let popupInputNickname = popupForm.querySelector('#input-nickname');
  let popupInputDescription = popupForm.querySelector('#input-description');

  profileNickname.textContent = popupInputNickname.value;
  profileDescription.textContent = popupInputDescription.value;
}

// слушатели на нажатие мышью, для открытия и закрытия поп-апа
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// слушатели на submit
popupForm.addEventListener('submit', formSubmitHandler);