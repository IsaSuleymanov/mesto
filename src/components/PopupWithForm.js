import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__content");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
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
    this._popup.querySelector(".popup__content").reset();
  }

  renderLoading(isLoading) {
    if (isLoading) this._saveButton.textContent = "Сохранение...";
    else this._saveButton.textContent = "Сохранить";
  }
}
