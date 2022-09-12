import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupCards = document.querySelector(".popup_type_cards");
const cardName = popupCards.querySelector("#title");
const cardLink = popupCards.querySelector("#image");
const cardsContainer = document.querySelector(".cards");
const popupCloseButton = document.querySelector(".popup__close-button");
popupCloseButton.addEventListener("click", () => {
  closeByClick(evt);
});

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popupProfile = document.querySelector(".popup_type_profile");
const inputName = popupProfile.querySelector("#username");
const inputAbout = popupProfile.querySelector("#about");

const popupImage = document.querySelector(".popup_type_image");
const inputImage = popupImage.querySelector(".popup__image");
const inputTitle = popupImage.querySelector(".popup__image-title");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
}

const closeByClick = (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(evt.currentTarget);
  }
};

const closePopupEscape = (evt) => {
  {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  }
};

const handleImagePopupOpen = (name, link) => {
  inputImage.src = link;
  inputImage.alt = name;
  inputTitle.textContent = name;
  openPopup(popupImage);
};

popupImage.addEventListener("mousedown", closeByClick);

const popups = Array.from(document.querySelectorAll(".popup"));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAbout.value;
  popupProfile.querySelector(".popup__save-button").disabled = true;
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
popupProfile.addEventListener("mousedown", closeByClick);

function addButtonClick() {
  openPopup(popupCards);
}

function closeCardsButtonClick() {
  closePopup(popupCards);
}

const createCard = (name, link, cardTemplate, openImagePopup) => {
  const card = new Card(name, link, cardTemplate, openImagePopup);
  return card.generateCard();
};

function handleCardsSubmitHandler(evt) {
  evt.preventDefault();

  const card = createCard(
    cardName.value,
    cardLink.value,
    "#card-template",
    handleImagePopupOpen
  );

  cardsContainer.prepend(card);

  popupCards.querySelector(".popup__save-button").disabled = true;
  closePopup(popupCards);
  popupCards.querySelector(".popup__content").reset();
}

popupCards.addEventListener("submit", handleCardsSubmitHandler);
addButton.addEventListener("click", addButtonClick);
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
  const card = createCard(
    item.name,
    item.link,
    "#card-template",
    handleImagePopupOpen
  );
  cardsContainer.append(card);
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
