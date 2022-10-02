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
import PopupWithCardDelete from "../components/PopupWithCardDelete";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const handleDeleteClick = (cardId, card) => {
  deletePopup.open(cardId, card);
};

const handleSetLike = (cardId) => {
  return api.setLike(cardId);
};

const handleDeleteLike = (cardId) => {
  return api.deleteLike(cardId);
};

const createCard = (
  name,
  link,
  cardId,
  likes,
  cardTemplate,
  handleCardClick,
  handleDeleteClick,
  isOwn,
  handleSetLike,
  handleDeleteLike,
  isLiked
) => {
  const card = new Card(
    name,
    link,
    cardId,
    likes,
    cardTemplate,
    handleCardClick,
    handleDeleteClick,
    isOwn,
    handleSetLike,
    handleDeleteLike,
    isLiked
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const userInformation = new UserInfo(
  ".profile__name",
  ".profile__about-me",
  ".profile__avatar"
);

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      cardList.appendItem(
        createCard(
          item.name,
          item.link,
          item._id,
          item.likes,
          "#card-template",
          handleCardClick,
          handleDeleteClick,
          true,
          handleSetLike,
          handleDeleteLike,
          isLiked
        )
      );
    },
  },
  ".cards"
);

const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
    headers: {
      authorization: "9a995b56-f8dc-43e6-82f3-ee3fe43e9558",
      "Content-Type": "application/json",
    },
  },
  "cohort-50"
);

api.getUser().then((result) => {
  userInformation.setUserInfo(result.name, result.about);
  userInformation.setUserAvatar(result.avatar);
});
api.getInitialCards().then((result) => {
  result.forEach((item) => {
    let isLiked = false;
    item.likes.forEach((user) => {
      if (user._id === api.userId) {
        isLiked = true;
      }
    });
    cardList.appendItem(
      createCard(
        item.name,
        item.link,
        item._id,
        item.likes.length,
        "#card-template",
        handleCardClick,
        handleDeleteClick,
        api.userId === item.owner._id ? true : false,
        handleSetLike,
        handleDeleteLike,
        isLiked
      )
    );
  });
});

const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  function handleSubmitForm(evt, { 0: name, 1: about }) {
    evt.preventDefault();
    profilePopup.renderLoading(true);
    api
      .editUserInfo(name, about)
      .then((result) => {
        userInformation.setUserInfo(result.name, result.about);
      })
      .finally(() => profilePopup.renderLoading(false));
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
    cardsPopup.renderLoading(true);
    api
      .addNewCard(name, link)
      .then((result) => {
        cardList.prependItem(
          createCard(
            result.name,
            result.link,
            result._id,
            result.likes.length,
            "#card-template",
            handleCardClick,
            handleDeleteClick,
            true,
            handleSetLike,
            handleDeleteLike,
            false
          )
        );
      })
      .finally(() => cardsPopup.renderLoading(false));
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
const popupAvatarValid = new FormValidator(
  constants,
  document.querySelector(".popup_type_avatar")
);

popupProfileValid.enableValidation();
popupCardsValid.enableValidation();
popupAvatarValid.enableValidation();

cardList.renderItems();

const deletePopup = new PopupWithCardDelete(
  ".popup_type_delete-card",
  function handleDeleteCard(evt, cardId, card) {
    evt.preventDefault();
    deletePopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then((res) => {
        deletePopup.close();
        card.remove();
        card = null;
      })
      .finally(() => deletePopup.renderLoading(false));
  }
);
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  function handleSetAvatar(evt, { 0: avatar }) {
    evt.preventDefault();
    popupCardsValid.disableSubmitButton();
    api.setAvatar(avatar);
    avatarPopup.close();
    profileAvatar.src = avatar;
  }
);
avatarPopup.setEventListeners();
const profileAvatar = document.querySelector(".profile__avatar");
profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
});
