const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popupProfile = document.querySelector(".popup_type_profile");
const inputName = popupProfile.querySelector("#username");
const inputAbout = popupProfile.querySelector("#about");
const editCloseButton = popupProfile.querySelector(".popup__close-button");

const popupCards = document.querySelector(".popup_type_cards");
const cardName = popupCards.querySelector("#title");
const cardLink = popupCards.querySelector("#image");
const cardsCloseButton = popupCards.querySelector(".popup__close-button");
const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

const popupImage = document.querySelector(".popup_type_image");
const inputImage = popupImage.querySelector(".popup__image");
const inputTitle = popupImage.querySelector(".popup__image-title");
const imageCloseButton = popupImage.querySelector(".popup__close-button");

const popups = Array.from(document.querySelectorAll(".popup"));

function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  document.addEventListener("keydown", closePopupEscape);
  if (!popup.classList.contains("popup_type_image")) {
    disableButtonOnStart(popup.querySelector(".popup__save-button"));
  }
}
function closePopup(popup) {
  popup.classList.add("popup_hidden");
  document.removeEventListener("keydown", closePopupEscape);
}

const closeByClick = (evt) => {
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

function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const image = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardName;
  image.src = cardLink;
  image.alt = cardName;

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardElement
    .querySelector(".card__delete-card")
    .addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });

  image.addEventListener("click", (evt) => {
    inputImage.src = evt.target.src;
    inputImage.alt = evt.target.alt;
    inputTitle.textContent = evt.target.alt;
    openPopup(popupImage);
  });

  return cardElement;
}

function handleCardsSubmitHandler(evt) {
  evt.preventDefault();

  cardsContainer.prepend(createCard(cardName.value, cardLink.value));

  closePopup(popupCards);
  cardName.value = "";
  cardLink.value = "";
}

popupCards.addEventListener("submit", handleCardsSubmitHandler);
addButton.addEventListener("click", addButtonClick);
cardsCloseButton.addEventListener("click", closeCardsButtonClick);
popupCards.addEventListener("mousedown", closeByClick);

function closeImageButtonClick() {
  closePopup(popupImage);
}

imageCloseButton.addEventListener("click", closeImageButtonClick);
popupImage.addEventListener("mousedown", closeByClick);

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.name, item.link));
});
