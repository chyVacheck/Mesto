const formAdd = {
  form: '#add-popup-form',
  button: '#add-button-submit',
};

const formEdit = {
  form: '#edit-popup-form',
  button: '#button-submit',
}


function enableValidation(config) {
  // находим нужную форму
  const form = document.querySelector(config.form);
  // навешиваем на нее слушатель submit
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event, config));
};

function handleFormSubmit(event){
  //отменяем отправку
  event.preventDefault();
  //опредлеить валидна ли форма
  const form = event.currentTarget;

  const isValid = form.checkValidity();
  //вывести в console
  if (isValid) {
    console.log('Форма полностью валидна');
    //если форма валидна, то сбросить ее
    form.reset();
  } else {
    console.log('Форма не валидна, есть ошибки');
  }
}

function handleFormInput(event, config){
  const input = event.target;
  const form = event.currentTarget;

  //установить свои тексты ошибок
  setCustomError(input);
  //показывать эти ошибки под полем
  showFieldError(input);
  //включить или выключить кнопку отправки формы
  setSubmitButtonState(form, config);
}

function setCustomError(input) {
  const validity = input.validity;

  input.setCustomValidity(error = '');

  if (validity.tooShort) {
    input.setCustomValidity(error = errorMesages.tooShort);
  }
  // в реальной жизни браузер не дает написать больше текста, чем максимальное количество
  if (validity.tooLong) {
    input.setCustomValidity(error = errorMesages.tooLong);
  }

  if (validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(error = errorMesages.typeMismatchUrl);
  }

  if (validity.valueMissing) {
    input.setCustomValidity(error = errorMesages.valueMissing);
  }
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config){
  const button = form.querySelector(config.button);
  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute(qualifiedName = 'disabled', false);
    button.classList.remove('popup__submit-button_invalid');
    button.classList.add('popup__submit-button_valid');
    button.classList.add('button');
  } else {
    button.setAttribute(qualifiedName = 'disabled', true);
    button.classList.add('popup__submit-button_invalid');
    button.classList.remove('popup__submit-button_valid');
    button.classList.remove('button');
  }

}



enableValidation(formAdd);
enableValidation(formEdit);

