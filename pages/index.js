console.log('Привет');

let page = document.querySelector('.page');
//todo let header = page.querySelector('.header');
let content = page.querySelector('.content');
//todo let footer = page.querySelector('.footer');

let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
let popupForm = popup.querySelector('#popup__form');
let popupInputNickname = popupForm.querySelector('#input-nickname');
let popupInputDescription = popupForm.querySelector('#input-description');

let profile = content.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let profileNickname = profileInfo.querySelector('.profile__nickname');
let profileDescription = profileInfo.querySelector('.profile__description');

let profileEditButton = profileInfo.querySelector('.profile__edit-button');
//todo let profileAddButton = profile.querySelector('.profile__add-button');

// открываем поп ап
function open_popup() {
  popupInputNickname.value = profileNickname.textContent;
  popupInputDescription.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

// закрываем поп ап
function close_popup() {
  popup.classList.remove('popup_opened');
}

// размещаеи инфу из inputov, в профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  let popupInputNickname = popupForm.querySelector('#input-nickname');
  let popupInputDescription = popupForm.querySelector('#input-description');

  profileNickname.textContent = popupInputNickname.value;
  profileDescription.textContent = popupInputDescription.value;
}

profileEditButton.addEventListener('click', open_popup);
popupCloseButton.addEventListener('click', close_popup);
popupSubmitButton.addEventListener('click', formSubmitHandler);

popupForm.addEventListener('submit', formSubmitHandler);