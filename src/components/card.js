function createCard(cardTemplate, cardData, deleteCallback, likeCallback, handleImageClick) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    image.alt = cardData.name;
    image.src = cardData.link;

    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardElement.querySelector(".card__delete-button").addEventListener('click', deleteCallback);
    cardElement.querySelector(".card__like-button").addEventListener('click', likeCallback);

    image.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

function toggleLike(event) {
    event.target.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, toggleLike};