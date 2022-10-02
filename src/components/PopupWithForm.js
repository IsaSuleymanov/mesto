import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._inputValuesList = {};
    for (let i = 0; i < this._inputList.length; i++) {
      if (this._inputList[i] !== undefined) {
        this._inputValuesList[i] = this._inputList[i].value;
      }
    }
    return this._inputValuesList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._saveButton.addEventListener("click", (evt) => {
      this._handleSubmitForm(evt, this._getInputValues());
    });
  }

  open() {
    this._saveButton.textContent = "Сохранить";
    super.open();
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
  }

  renderLoading(isLoading) {
    if (isLoading) this._saveButton.textContent = "Сохранение...";
  }
}
