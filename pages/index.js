console.log('Привет');

let page = document.querySelector('.page');
// let header = page.querySelector('.header');
let content = page.querySelector('.content');
// let footer = page.querySelector('.footer');

let popup = document.querySelector('.popup');
let popup__closeButton = popup.querySelector('.popup__close-button');
let popup__inputNickname = popup.querySelector('#input-nickname');
let popup__inputDescription = popup.querySelector('#input-description');

let popup__submitButton = popup.querySelector('.popup__submit-button');


let profile = content.querySelector('.profile');
let profile__info = profile.querySelector('.profile__info');
let profile__nickname = profile.querySelector('.profile__nickname');
let profile__description = profile.querySelector('.profile__description');

let profile__editButton = profile__info.querySelector('.profile__edit-button');
let profile__addButton = profile.querySelector('.profile__add-button');

// открываем поп ап
function open_popup() {
  popup.classList.add('popup_opened');
}

// закрываем поп ап
function close_popup() {
  popup.classList.remove('popup_opened');
}

// размещаеи инфу из inputov, в профиль
function submit_info() {
  let popup__inputNickname = popup.querySelector('#input-nickname');
  let popup__inputDescription = popup.querySelector('#input-description');

  profile__nickname.textContent = popup__inputNickname.value;
  profile__description.textContent = popup__inputDescription.value;
}

profile__editButton.addEventListener('click', open_popup);
popup__closeButton.addEventListener('click', close_popup);
popup__submitButton.addEventListener('click', submit_info);