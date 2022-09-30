import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector(".popup__save-button")
      .addEventListener("click", (evt) => {
        this._handleSubmitForm(evt);
      });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
  }
}
