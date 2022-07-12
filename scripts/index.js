const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popupProfile = document.querySelector(".popup-profile");
const popupProfileName = popupProfile.querySelector(
  ".popup__profile-info_mb_m"
);
const popupProfileAbout = popupProfile.querySelector(
  ".popup__profile-info_mb_l"
);
const popupEditCloseButton = popupProfile.querySelector(".popup__close-button");

const popupCards = document.querySelector(".popup-cards");
const popupCardsName = document.querySelector(".popup__profile-cards_mb_m");
const popupCardsLink = document.querySelector(".popup__profile-cards_mb_l");
const popupCardsCloseButton = popupCards.querySelector(".popup__close-button");
const cards = document.querySelector(".cards");

const popupImage = document.querySelector(".popup-open-card");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAbout.value;
  popupProfile.classList.add("popup_hidden");
}

function editButtonClick() {
  popupProfile.classList.remove("popup_hidden");
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAboutMe.textContent;
}
function closeEditButtonClick() {
  popupProfile.classList.add("popup_hidden");
}

popupProfile.addEventListener("submit", formProfileSubmitHandler);
editButton.addEventListener("click", editButtonClick);
popupEditCloseButton.addEventListener("click", closeEditButtonClick);

function addButtonClick() {
  popupCards.classList.remove("popup_hidden");
}

function closeCardsButtonClick() {
  popupCards.classList.add("popup_hidden");
}

function addCard(cardName, cardLink) {
  cardTemplate = document.querySelector("#card-template").content;
  cardElement = cardTemplate.querySelector(".card").cloneNode(true);

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

function formCardsSubmitHandler(evt) {
  evt.preventDefault();

  const name = document.querySelector(".popup__profile-cards_mb_m");
  const link = document.querySelector(".popup__profile-cards_mb_l");

  cards.prepend(addCard(name.value, link.value));

  name.value = "";
  link.value = "";
  popupCards.classList.add("popup_hidden");
}

popupCards.addEventListener("submit", formCardsSubmitHandler);
addButton.addEventListener("click", addButtonClick);
popupCardsCloseButton.addEventListener("click", closeCardsButtonClick);

function closeImageButtonClick() {
  popupImage.classList.add("popup_hidden");
}

popupImageCloseButton.addEventListener("click", closeImageButtonClick);

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
  cards.append(addCard(item.name, item.link));
});
