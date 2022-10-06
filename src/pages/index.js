import "./index.css";
import {
  profileEditButton,
  userName,
  userAbout,
  addCardButton,
  constants,
  profileAvatar,
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

const handleSetLike = (cardId, card) => {
  api
    .setLike(cardId)
    .then((res) => {
      card.setLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDeleteLike = (cardId, card) => {
  api
    .deleteLike(cardId)
    .then((res) => {
      card.removeLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
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

const cardList = new Section((item) => {
  let isLiked = false;
  item.likes.forEach((user) => {
    if (user._id === userInformation.getUserId()) {
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
      userInformation.getUserId() === item.owner._id ? true : false,
      handleSetLike,
      handleDeleteLike,
      isLiked
    )
  );
}, ".cards");

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

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInformation.setUserInfo(info.name, info.about);
    userInformation.setUserAvatar(info.avatar);
    userInformation.setUserId(info._id);

    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  function handleSubmitForm({ username: name, about: about }) {
    profilePopup.renderLoading(true);
    api
      .editUserInfo(name, about)
      .then((result) => {
        userInformation.setUserInfo(result.name, result.about);
        profilePopup.close();
        popupProfileValid.disableSubmitButton();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
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
  function handleSubmitForm({ title: name, image: link }) {
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
        cardsPopup.close();
        popupCardsValid.disableSubmitButton();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardsPopup.renderLoading(false);
      });
  }
);
cardsPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  popupCardsValid.hideErrors();
  cardsPopup.open();
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const deletePopup = new PopupWithCardDelete(
  ".popup_type_delete-card",
  function handleDeleteCard(cardId, card) {
    deletePopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then((res) => {
        deletePopup.close();
        card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => deletePopup.renderLoading(false));
  }
);
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  function handleSetAvatar({ url: avatar }) {
    avatarPopup.renderLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        popupAvatarValid.disableSubmitButton();
        avatarPopup.close();
        profileAvatar.src = avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => avatarPopup.renderLoading(false));
  }
);
avatarPopup.setEventListeners();
profileAvatar.addEventListener("click", () => {
  popupAvatarValid.hideErrors();
  avatarPopup.open();
});

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
