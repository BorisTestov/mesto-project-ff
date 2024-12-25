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

    cardDeleteBtn.addEventListener("click", (evt) => deleteCallback(evt, cardData));
    likeBtn.addEventListener("click", (evt) => likeCallback(evt, cardData, likeCounter));
    likeCounter.textContent = cardData.likes.length;
    image.addEventListener('click', () => handleImageClick(cardData));

    if (cardData.owner._id !== user._id){
        cardDeleteBtn.style.display = "None";
    }

    if (cardData.likes.some((like) => like._id === user._id)){
        likeBtn.classList.add("card__like-button_is-active");
    }

    return cardElement;
}

function deleteCard(event, card) {
    deleteCardApi(card._id)
        .then(() => event.target.closest(".card").remove())
        .catch((err) => console.log(`Ошибка: ${err}`));
}

function toggleLike(event, card, likeCounter) {
    console.log(event, card, likeCounter);
    if (event.target.classList.toggle("card__like-button_is-active")){
        putLike(card._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
    }
    else{
        deleteLike(card._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
    }

}

export {createCard, deleteCard, toggleLike};