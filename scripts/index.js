const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popup = document.querySelector(".popup");
const popupProfileName = popup.querySelector(".popup__profile-info_mb_m");
const popupProfileAbout = popup.querySelector(".popup__profile-info_mb_l");
const popupCloseButton = popup.querySelector(".popup__close-button");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAbout.value;
  popup.classList.add("popup_hidden");
}

function editButtonClick() {
  popup.classList.remove("popup_hidden");
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAboutMe.textContent;
}
function closeButtonClick() {
  popup.classList.add("popup_hidden");
}

popup.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", editButtonClick);

popupCloseButton.addEventListener("click", closeButtonClick);
