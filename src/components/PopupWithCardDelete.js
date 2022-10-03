import Popup from "./Popup.js";

export default class PopupWithCardDelete extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector(".popup__save-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._cardId, this._card);
      });
  }

  renderLoading(isLoading) {
    if (isLoading) this._saveButton.textContent = "Удаление...";
    else this._saveButton.textContent = "Да";
  }
}
