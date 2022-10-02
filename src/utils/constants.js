export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const userName = document.querySelector("#username");
export const userAbout = document.querySelector("#about");
export const userAvatar = document.querySelector(".profile__avatar");

export const addCardButton = document.querySelector(".profile__add-button");
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const constants = {
  form: "popup__content",
  input: "popup__input",
  saveButton: "popup__save-button",
  inputError: "popup__input_type_error",
  errorMessage: "popup-input-error_active",
};
