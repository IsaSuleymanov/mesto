export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._saveButton = this._popup.querySelector(".popup__save-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _handleClickClose = (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleClickClose(evt);
    });

    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
