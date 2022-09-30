import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(name, link) {
    super.open();
    document.querySelector(".popup__image").src = link;
    document.querySelector(".popup__image").alt = name;
    document.querySelector(".popup__image-title").textContent = name;
  }
}
