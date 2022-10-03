export default class Card {
  constructor(
    name,
    link,
    cardId,
    likes,
    templateSelector,
    openImagePopup,
    openDeletePopup,
    isOwn,
    handleSetLike,
    handleDeleteLike,
    isLiked
  ) {
    this._link = link;
    this._title = name;
    this._cardId = cardId;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._isOwn = isOwn;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleLikeClick() {
    if (!this._likeButton.classList.contains("card__like_active")) {
      this._handleSetLike(this._cardId, this);
    } else this._handleDeleteLike(this._cardId, this);
  }

  setLike(res) {
    this._likes = res.likes.length;
    this._likeButton.classList.add("card__like_active");
    this._likesCount.textContent = this._likes;
  }

  removeLike(res) {
    this._likes = res.likes.length;
    this._likeButton.classList.remove("card__like_active");
    this._likesCount.textContent = this._likes;
  }

  deleteCard() {
    this._handleDeleteClick();
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
        this._openDeletePopup(this._cardId, this);
      });

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup(this._title, this._link);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._likesCount = this._card.querySelector(".card__likes");
    this._likeButton = this._card.querySelector(".card__like");
    this._deleteButton = this._card.querySelector(".card__delete-card");
    if (this._isOwn) {
      this._deleteButton.classList.add("card__delete-card_type_own");
    }
    if (this._isLiked) {
      this._likeButton.classList.add("card__like_active");
    }
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._likesCount.textContent = this._likes;
    this._card.querySelector(".card__title").textContent = this._title;

    this._setEventListeners();
    return this._card;
  }
}
