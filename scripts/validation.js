const constants = {
  form: "popup__content",
  input: "popup__input",
  saveButton: "popup__save-button",
  inputError: "popup__input_type_error",
  errorMessage: "popup-input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(constants.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(constants.errorMessage);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(constants.inputError);
  errorElement.classList.remove(constants.errorMessage);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const disableButtonOnStart = (buttonElement) => {
  buttonElement.disabled = true;
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${constants.input}`)
  );
  const buttonElement = formElement.querySelector(`.${constants.saveButton}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(`.${constants.form}`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
