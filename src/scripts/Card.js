export default class Card {
  constructor(name, link, templateSelector, openImagePopup) {
    this._link = link;
    this._title = name;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
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
    this._card = null;
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

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup(this._title, this._link);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._card.querySelector(".card__title").textContent = this._title;

    this._setEventListeners();
    return this._card;
  }
}
