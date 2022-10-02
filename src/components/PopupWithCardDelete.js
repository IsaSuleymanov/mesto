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
    this._saveButton.textContent = "Да";
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector(".popup__save-button")
      .addEventListener("click", (evt) => {
        this._handleSubmitForm(evt, this._cardId, this._card);
      });
  }

  renderLoading(isLoading) {
    if (isLoading) this._saveButton.textContent = "Удаление...";
  }
}
