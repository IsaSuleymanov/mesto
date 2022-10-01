export default class FormValidator {
  constructor(constants, form) {
    this._input = constants.input;
    this._saveButton = constants.saveButton;
    this._inputError = constants.inputError;
    this._errorMessage = constants.errorMessage;
    this._form = form;

    this._inputList = Array.from(
      this._form.querySelectorAll(`.${this._input}`)
    );
    this._saveButtonElement = this._form.querySelector(`.${this._saveButton}`);
  }

  _showInputError() {
    const errorElement = this._form.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.add(this._inputError);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorMessage);
  }

  _hideInputError() {
    const errorElement = this._form.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.remove(this._inputError);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorMessage);
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleStateButton() {
    if (this._hasInvalidInput()) {
      this._saveButtonElement.disabled = true;
    } else {
      this._saveButtonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleStateButton();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._inputElement = input;
        this._checkInputValidity();
        this._toggleStateButton();
      });
    });
  }

  hideErrors() {
    this._inputList.forEach((input) => {
      this._inputElement = input;
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputError);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorMessage);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
