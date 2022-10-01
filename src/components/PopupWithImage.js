import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(name, link) {
    super.open();
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
    this._popup.querySelector(".popup__image-title").textContent = name;
  }
}
