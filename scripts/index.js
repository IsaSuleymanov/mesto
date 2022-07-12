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
const imageCloseButton = popupImage.querySelector(".popup__close-button");

function openPopup(popup) {
  popup.classList.remove("popup_hidden");
}
function closePopup(popup) {
  popup.classList.add("popup_hidden");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAbout.value;
  closePopup(popupProfile);
}

function editButtonClick() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutMe.textContent;
}
function closeEditButtonClick() {
  closePopup(popupProfile);
}

popupProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", editButtonClick);
editCloseButton.addEventListener("click", closeEditButtonClick);

function addButtonClick() {
  openPopup(popupCards);
}

function closeCardsButtonClick() {
  closePopup(popupCards);
}

function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__image").alt = cardName;

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardElement
    .querySelector(".card__delete-card")
    .addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });

  cardElement.querySelector(".card__image").addEventListener("click", (evt) => {
    popupImage.classList.remove("popup_hidden");
    popupImage.querySelector(".popup__image").src = evt.target.src;
    popupImage.querySelector(".popup__image").alt = evt.target.alt;
    popupImage.querySelector(".popup__image-title").textContent =
      evt.target.alt;
  });

  return cardElement;
}

function handleCardsSubmitHandler(evt) {
  evt.preventDefault();

  cardsContainer.prepend(createCard(cardName.value, cardLink.value));

  cardName.value = "";
  cardLink.value = "";
  closePopup(popupCards);
}

popupCards.addEventListener("submit", handleCardsSubmitHandler);
addButton.addEventListener("click", addButtonClick);
cardsCloseButton.addEventListener("click", closeCardsButtonClick);

function closeImageButtonClick() {
  closePopup(popupImage);
}

imageCloseButton.addEventListener("click", closeImageButtonClick);

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.name, item.link));
});
