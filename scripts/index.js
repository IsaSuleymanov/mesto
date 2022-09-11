import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupCards = document.querySelector(".popup_type_cards");
const cardName = popupCards.querySelector("#title");
const cardLink = popupCards.querySelector("#image");
const cardsCloseButton = popupCards.querySelector(".popup__close-button");
const cardsContainer = document.querySelector(".cards");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popupProfile = document.querySelector(".popup_type_profile");
const inputName = popupProfile.querySelector("#username");
const inputAbout = popupProfile.querySelector("#about");
const editCloseButton = popupProfile.querySelector(".popup__close-button");

export const popupImage = document.querySelector(".popup_type_image");
export const inputImage = popupImage.querySelector(".popup__image");
export const inputTitle = popupImage.querySelector(".popup__image-title");
export const imageCloseButton = popupImage.querySelector(
  ".popup__close-button"
);

const popups = Array.from(document.querySelectorAll(".popup"));

export function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  document.addEventListener("keydown", closePopupEscape);
}
export function closePopup(popup) {
  popup.classList.add("popup_hidden");
  document.removeEventListener("keydown", closePopupEscape);
}

export const closeByClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

const closePopupEscape = (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (!popup.classList.contains("popup_hidden")) {
        closePopup(popup);
      }
    });
  }
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAbout.value;
  closePopup(popupProfile);
}

function editButtonClick() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutMe.textContent;
  openPopup(popupProfile);
}
function closeEditButtonClick() {
  closePopup(popupProfile);
}

popupProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", editButtonClick);
editCloseButton.addEventListener("click", closeEditButtonClick);
popupProfile.addEventListener("mousedown", closeByClick);

function addButtonClick() {
  openPopup(popupCards);
}

function closeCardsButtonClick() {
  closePopup(popupCards);
}

function handleCardsSubmitHandler(evt) {
  evt.preventDefault();

  const card = new Card(cardName.value, cardLink.value, "#card-template");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);

  closePopup(popupCards);
  cardName.value = "";
  cardLink.value = "";
}

popupCards.addEventListener("submit", handleCardsSubmitHandler);
addButton.addEventListener("click", addButtonClick);
cardsCloseButton.addEventListener("click", closeCardsButtonClick);
popupCards.addEventListener("mousedown", closeByClick);

const initialCards = [
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

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

const constants = {
  form: "popup__content",
  input: "popup__input",
  saveButton: "popup__save-button",
  inputError: "popup__input_type_error",
  errorMessage: "popup-input-error_active",
};

const popupProfileValid = new FormValidator(constants, popupProfile);
const popupCardsValid = new FormValidator(constants, popupCards);

popupProfileValid.enableValidation();
popupCardsValid.enableValidation();
