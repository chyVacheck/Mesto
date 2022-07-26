const formAdd = {
  formSelector: '#add-popup-form',
  button: 'button',
  submitButtonSelector: '#add-button-submit',
  buttonValid: 'popup__submit-button_valid',
  buttonInValid: 'popup__submit-button_invalid',
};

const formEdit = {
  formSelector: '#edit-popup-form',
  button: 'button',
  submitButtonSelector: '#button-submit',
  buttonValid: 'popup__submit-button_valid',
  buttonInValid: 'popup__submit-button_invalid',
}

function enableValidation(config) {
  // находим нужную форму
  const form = document.querySelector(config.formSelector);
  // навешиваем на нее слушатель submit
  form.addEventListener('submit', (event) => handleFormSubmit(event, config));
  form.addEventListener('input', (event) => handleFormInput(event, config));
};

function handleFormSubmit(event, config){
  //отменяем отправку
  event.preventDefault();
  //опредлеить валидна ли форма
  const form = event.currentTarget;

  const isValid = form.checkValidity();
  //вывести в console
  if (isValid) {
    //если форма валидна, то сбросить ее
    form.reset();
    setSubmitButtonState(form, config);
  }
}

function handleFormInput(event, config){
  const input = event.target;
  const form = event.currentTarget;

  //показывать эти ошибки под полем
  showFieldError(input);
  //включить или выключить кнопку отправки формы
  setSubmitButtonState(form, config);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config){
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute(qualifiedName = 'disabled');
    button.classList.remove(config.buttonInValid);
    button.classList.add(config.buttonValid);
    button.classList.add(config.button);
  } else {
    button.setAttribute(qualifiedName = 'disabled', value = true);
    button.classList.add(config.buttonInValid);
    button.classList.remove(config.buttonValid);
    button.classList.remove(config.button);
  }

}

enableValidation(formAdd);
enableValidation(formEdit);

