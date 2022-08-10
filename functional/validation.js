const form = {
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  activeButtonClass: 'popup__submit-button_valid',
  inactiveButtonClass: 'popup__submit-button_invalid',
  errorClass: '.popup__error-mesage',
};

function enableValidation(config) {
  // находим все формы
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  // навешиваем на каждую форму слушатели submit и input
  forms.forEach(function (item) {
    item.addEventListener('submit', (event) => handleFormSubmit(event, config));
    item.addEventListener('input', (event) => handleFormInput(event, config));
  });
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
    button.classList.remove(config.inactiveButtonClass);
    button.classList.add(config.activeButtonClass);
    button.classList.add(selectorButton);
  } else {
    button.setAttribute(qualifiedName = 'disabled', value = true);
    button.classList.add(config.inactiveButtonClass);
    button.classList.remove(config.activeButtonClass);
    button.classList.remove(selectorButton);
  }

}

enableValidation(form);
