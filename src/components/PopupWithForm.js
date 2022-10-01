import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    return {
      firstInput: this._inputList[0].value,
      secondInput: this._inputList[1].value,
    };
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector(".popup__save-button")
      .addEventListener("click", (evt) => {
        this._handleSubmitForm(evt, this._getInputValues());
      });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
  }
}
