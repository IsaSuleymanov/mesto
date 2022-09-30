import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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

const handleCardClick = (name, link) => {
  ImagePopup.open(name, link);
};

const CardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#card-template",
        handleCardClick
      );
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
    },
  },
  ".cards"
);

const UserInformation = new UserInfo(".profile__name", ".profile__about-me");

const ProfilePopup = new PopupWithForm(
  ".popup_type_profile",
  function handleSubmitForm(evt) {
    evt.preventDefault();
    UserInformation.setUserInfo(
      document.querySelector("#username").value,
      document.querySelector("#about").value
    );
    evt.target.disabled = true;
    ProfilePopup.close();
  }
);
ProfilePopup.setEventListeners();
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    ProfilePopup.open();
    const UserInformationArr = UserInformation.getUserInfo();
    document.querySelector("#username").value = UserInformationArr[0];
    document.querySelector("#about").value = UserInformationArr[1];
  });

const CardsPopup = new PopupWithForm(
  ".popup_type_cards",
  function handleSubmitForm(evt) {
    evt.preventDefault();
    const card = new Card(
      document.querySelector("#title").value,
      document.querySelector("#image").value,
      "#card-template",
      handleCardClick
    );
    const cardElement = card.generateCard();
    CardList.addItemPrepend(cardElement);
    CardsPopup.close();
  }
);
CardsPopup.setEventListeners();
document.querySelector(".profile__add-button").addEventListener("click", () => {
  CardsPopup.open();
});

const ImagePopup = new PopupWithImage(".popup_type_image");
ImagePopup.setEventListeners();

const constants = {
  form: "popup__content",
  input: "popup__input",
  saveButton: "popup__save-button",
  inputError: "popup__input_type_error",
  errorMessage: "popup-input-error_active",
};

const popupProfileValid = new FormValidator(
  constants,
  document.querySelector(".popup_type_profile")
);
const popupCardsValid = new FormValidator(
  constants,
  document.querySelector(".popup_type_cards")
);

popupProfileValid.enableValidation();
popupCardsValid.enableValidation();

CardList.renderItems();
