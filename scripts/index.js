const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    image.alt = cardData.name;
    image.src = cardData.link;

    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardElement.querySelector(".card__delete-button").addEventListener('click', deleteCallback);

    return cardElement;
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

initialCards.forEach(card => {
    const cardElement = createCard(card, deleteCard);
    placesList.append(cardElement);
})
