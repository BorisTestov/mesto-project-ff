import baseAvatar from '../images/avatar.jpg';

const config = {
    baseURL: 'https://mesto.nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: '509a802a-cd5b-4c93-b890-2da0fefba2f0',
        'Content-Type': 'application/json'
    }
}

const defaultUser = {
    "name": "Жак-Ив Кусто",
    "about": "Исследователь океана",
    "avatar": baseAvatar,
    "_id": "-1"
}

function getAboutMe() {
    return fetch(`${config.baseURL}/users/me`, {
        headers: config.headers
    })
        .then((res) =>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function getInitialCards() {
    return fetch(`${config.baseURL}/cards`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function patchProfile(name, description){
    return fetch(`${config.baseURL}/users/me`, {
        headers: config.headers,
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function postNewCard(name, link){
    return fetch(`${config.baseURL}/cards`, {
        headers: config.headers,
        method: "POST",
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function deleteCard(cardId){
    return fetch(`${config.baseURL}/cards/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function putLike(cardId){
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "PUT",
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function deleteLike(cardId){
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function patchAvatar(link) {
    return fetch(`${config.baseURL}/users/me/avatar`, {
        headers: config.headers,
        method: "PATCH",
        body: JSON.stringify({
            avatar: link
        })
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export {
    getAboutMe, getInitialCards,
    patchProfile,
    postNewCard, deleteCard,
    putLike, deleteLike,
    patchAvatar,
    defaultUser
}