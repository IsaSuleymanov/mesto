const editButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupSaveButton = document.querySelector(".popup__save-button");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popupProfileName = document.querySelector(".popup__profile-name");
const popupProfileAbout = document.querySelector(".popup__profile-about");

editButton.addEventListener("click", function () {
  popup.classList.remove("popup__hidden");
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAboutMe.textContent;
});

popupCloseButton.addEventListener("click", function () {
  popup.classList.add("popup__hidden");
});

popupSaveButton.addEventListener("click", function () {
  popup.classList.add("popup__hidden");
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAbout.value;
});
