import "./pages/index.css";

import { initialCards } from "./components/cards";
import { createCard, deleteCard, toggleLike } from "./components/card";
import {openModal, closeModal} from "./components/modal";


const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

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

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


function handleProfileEdit() {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditPopup);
}

function handleImageClick(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openModal(imagePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = {
        name: newCardNameInput.value,
        link: newCardSrcInput.value,
    }
    const cardElement = createCard(cardTemplate, card, deleteCard, toggleLike, handleImageClick);
    placesList.prepend(cardElement);
    newCardForm.reset();
    closeModal(newCardPopup);
}

profileEditBtn.addEventListener("click", handleProfileEdit);
profileImage.addEventListener("click", handleProfileEdit);
profileEditForm.addEventListener('submit',handleProfileFormSubmit);

newCardAddBtn.addEventListener("click",() => openModal(newCardPopup));
newCardForm.addEventListener('submit', handleCardFormSubmit);


initialCards.forEach(card => {
    const cardElement = createCard(cardTemplate, card, deleteCard, toggleLike, handleImageClick);
    placesList.append(cardElement);
})
