import {
  popupImage,
  inputImage,
  inputTitle,
  imageCloseButton,
  openPopup,
  closePopup,
  closeByClick,
} from "./index.js";

export default class Card {
  constructor(name, link, templateSelector) {
    this._link = link;
    this._title = name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleLikeClick() {
    this._card
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  }

  _handleDeleteClick() {
    this._card.remove();
  }

  _handleOpenPopup() {
    inputImage.src = this._link;
    inputImage.alt = this._title;
    inputTitle.textContent = this._title;
    openPopup(popupImage);
  }

  _handleClosePopup() {
    closePopup(popupImage);
  }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._card
      .querySelector(".card__delete-card")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._card.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenPopup();
    });

    imageCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    popupImage.addEventListener("mousedown", closeByClick);
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".card__image").src = this._link;
    this._card.querySelector(".card__image").alt = this._title;
    this._card.querySelector(".card__title").textContent = this._title;

    return this._card;
  }
}
