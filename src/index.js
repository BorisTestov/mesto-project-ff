import "./pages/index.css";

import {initialCards} from "./components/cards";
import {createCard, deleteCard, toggleLike} from "./components/card";
import {openModal, closeModal} from "./components/modal";

import {clearValidation, enableValidation} from "./components/validation.js";

import {getAboutMe, getInitialCards, patchProfile, postNewCard, patchAvatar, defaultUser} from "./components/api.js";


const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditSubmitBtn = profileEditPopup.querySelector('.popup__button');

const profileEditForm = document.forms["edit-profile"];
const profileNameInput = profileEditForm.elements['name'];
const profileDescriptionInput = profileEditForm.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const newCardAddBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardNameInput = newCardForm.elements['place-name'];
const newCardSrcInput = newCardForm.elements['link'];
const newCardSubmitBtn = newCardPopup.querySelector('.popup__button');

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const avatarEditBtn = document.querySelector(".profile__avatar-button");
const avatarEditPopup = document.querySelector(".popup_type_edit_avatar");
const avatarEditForm = document.forms["edit-avatar"];
const avatarLinkInput = avatarEditForm.elements.link;
const avatarLink = document.querySelector(".profile__image");
const avatarSubmitBtn = avatarEditPopup.querySelector('.popup__button');

const popupList = document.querySelectorAll(".popup");

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

function handleProfileEdit() {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
    clearValidation(profileEditForm, validationConfig);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileEditSubmitBtn.textContent = "Сохранение...";
    console.log(profileNameInput.value, profileDescriptionInput.value);

    patchProfile(profileNameInput.value, profileDescriptionInput.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .catch()
        .finally(() => {
            closeModal(profileEditPopup);
            profileEditSubmitBtn.textContent = "Сохранить";
        })
}

function handleImageClick(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openModal(imagePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    newCardSubmitBtn.textContent = "Сохранение...";

    postNewCard(newCardNameInput.value, newCardSrcInput.value)
        .then((res) => {
            placesList.prepend(
                createCard(
                    cardTemplate,
                    res,
                    deleteCard,
                    toggleLike,
                    handleImageClick,
                    res.owner
                )
            );
        })
        .catch()
        .finally(() => {
            newCardForm.reset();
            closeModal(newCardPopup);
            newCardSubmitBtn.textContent = "Сохранить";
        })
}

function handleCardAddClick(element) {
    openModal(newCardPopup);
    clearValidation(newCardForm, validationConfig);
}

function handleAvatarEditClick(element) {
    avatarLinkInput.value = avatarLink.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    openModal(avatarEditPopup);
    clearValidation(avatarEditForm, validationConfig);
}

function handleAvatarEditFormSubmit(evt) {
    evt.preventDefault();

    avatarSubmitBtn.textContent = "Сохранение...";

    patchAvatar(avatarLinkInput.value)
        .then((res) => {
            avatarLink.style.backgroundImage = `url("${res.avatar}")`;
        })
        .catch((err) => console.log(err))
        .finally(() => {
            closeModal(avatarEditPopup);
            avatarSubmitBtn.textContent = "Сохранить";
        });
}

avatarEditBtn.addEventListener("click", handleAvatarEditClick);
avatarEditForm.addEventListener('submit', handleAvatarEditFormSubmit);

profileEditBtn.addEventListener("click", handleProfileEdit);
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

newCardAddBtn.addEventListener("click", handleCardAddClick);
newCardForm.addEventListener('submit', handleCardFormSubmit);


popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (
            evt.target.classList.contains("popup_is-opened") ||
            evt.target.classList.contains("popup__close")
        ) {
            closeModal(popup);
        }
    });
});


Promise.all([getAboutMe(), getInitialCards()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url("${user.avatar}")`;
        cards.forEach((card) => {
            placesList.append(createCard(cardTemplate, card, deleteCard, toggleLike, handleImageClick, user));
        })
    })
    .catch((err) => {
        console.error("Ошибка получения данных пользователя и карточек:", err)

        profileTitle.textContent = defaultUser.name;
        profileDescription.textContent = defaultUser.about;
        profileImage.style.backgroundImage = `url("${defaultUser.avatar}")`;
        initialCards.forEach((card) => {
            placesList.append(createCard(cardTemplate, card, deleteCard, toggleLike, handleImageClick, defaultUser));
        });
    });
