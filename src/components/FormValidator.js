
export class FormValidator {
  constructor(config) {
    // классы и селекторы
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;

    this._activeButtonClass = config.activeButtonClass;
    this._inactiveButtonClass = config.inactiveButtonClass;

    this._buttonClass = config.buttonClass;
    this._errorClass = config.errorClass;

    // форма
    this.form = this._findForm();
  }

  enableValidation() {
    this.form.addEventListener('submit', (event) => this._handleFormSubmit(event, this));
    this.form.addEventListener('input', (event) => this._handleFormInput(event, this));
  }

  _handleFormSubmit(event, formObj) {
    event.preventDefault();
    const isValid = formObj.form.checkValidity();
    if (isValid) {
      formObj.setSubmitButtonState();
    }
  }

  _handleFormInput(event, formObj) {

    const input = event.target;
    formObj.setSubmitButtonState();
    formObj.showError(input);
  }

  showError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  //включить или выключить кнопку отправки формы
  setSubmitButtonState(isValid = this.form.checkValidity()) {

    const button = this.form.querySelector(this._submitButtonSelector);
    if (isValid) {
      button.removeAttribute('disabled', false);
      button.classList.remove(this._inactiveButtonClass);
      button.classList.add(this._activeButtonClass);
      button.classList.add(this._buttonClass);
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(this._inactiveButtonClass);
      button.classList.remove(this._activeButtonClass);
      button.classList.remove(this._buttonClass);
    }
  }

  // поиск form
  _findForm() {
    const form = document.querySelector(this._formSelector)
    return form;
  }

}
