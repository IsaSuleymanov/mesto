import "./index.css";
import {
  profileEditButton,
  userName,
  userAbout,
  addCardButton,
  initialCards,
  constants,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const createCard = (name, link, cardTemplate, handleCardClick) => {
  const card = new Card(name, link, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.appendItem(
        createCard(item.name, item.link, "#card-template", handleCardClick)
      );
    },
  },
  ".cards"
);

const userInformation = new UserInfo(".profile__name", ".profile__about-me");

const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  function handleSubmitForm(evt, { 0: name, 1: about }) {
    evt.preventDefault();
    userInformation.setUserInfo(name, about);
    popupProfileValid.disableSubmitButton();
    profilePopup.close();
  }
);
profilePopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
  popupProfileValid.hideErrors();
  profilePopup.open();
  const userInfo = userInformation.getUserInfo();
  userName.value = userInfo.name;
  userAbout.value = userInfo.about;
});

const cardsPopup = new PopupWithForm(
  ".popup_type_cards",
  function handleSubmitForm(evt, { 0: name, 1: link }) {
    evt.preventDefault();
    cardList.prependItem(
      createCard(name, link, "#card-template", handleCardClick)
    );
    popupCardsValid.disableSubmitButton();
    cardsPopup.close();
  }
);
cardsPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  popupCardsValid.hideErrors();
  cardsPopup.open();
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

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

cardList.renderItems();
