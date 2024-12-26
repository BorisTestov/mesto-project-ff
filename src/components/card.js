import { putLike, deleteLike, deleteCard as deleteCardApi } from "./api.js";

function createCard(cardTemplate, cardData, deleteCallback, likeCallback, handleImageClick, user) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
    const likeBtn = cardElement.querySelector(".card__like-button");
    const likeCounter = cardElement.querySelector(".card__like-counter");

    image.alt = cardData.name;
    image.src = cardData.link;

    cardElement.querySelector(".card__title").textContent = cardData.name;

    likeBtn.addEventListener("click", (evt) => likeCallback(evt, cardData._id, likeCounter));
    likeCounter.textContent = cardData.likes.length;
    image.addEventListener('click', () => handleImageClick(cardData));

    if (cardData.owner._id !== user._id){
        cardDeleteBtn.style.display = "None";
    }
    else {
        cardDeleteBtn.addEventListener("click", (evt) => deleteCallback(evt, cardData._id));
    }

    if (cardData.likes.some((like) => like._id === user._id)){
        likeBtn.classList.add("card__like-button_is-active");
    }

    return cardElement;
}

function deleteCard(event, cardId) {
    deleteCardApi(cardId)
        .then(() => event.target.closest(".card").remove())
        .catch((err) => console.log(`Ошибка: ${err}`));
}

function toggleLike(event, cardId, likeCounter) {
    const likeMethod = event.target.classList.contains("card__like-button_is-active") ? deleteLike : putLike;

    likeMethod(cardId)
        .then((res) => {
            likeCounter.textContent = res.likes.length;
            event.target.classList.toggle("card__like-button_is-active")
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
}

export {createCard, deleteCard, toggleLike};