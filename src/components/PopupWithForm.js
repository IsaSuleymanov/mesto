import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__content");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._saveButtonText = this._saveButton.textContent;
  }

  _getInputValues() {
    this._inputValuesList = {};
    this._inputList.forEach((input) => {
      this._inputValuesList[input.name] = input.value;
    });

    return this._inputValuesList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._saveButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._saveButton.disabled = true;
  }

  renderLoading(isLoading) {
    if (isLoading) this._saveButton.textContent = "Сохранение...";
    else this._saveButton.textContent = this._saveButtonText;
  }
}
