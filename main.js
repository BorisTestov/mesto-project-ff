(()=>{"use strict";var e=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",owner:{_id:"-1"}},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",owner:{_id:"-1"}},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",owner:{_id:"-1"}},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",owner:{_id:"-1"}},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",owner:{_id:"-1"}},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",owner:{_id:"-1"}}];var t={baseURL:"https://mesto.nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"509a802a-cd5b-4c93-b890-2da0fefba2f0","Content-Type":"application/json"}},n={name:"Жак-Ив Кусто",about:"Исследователь океана",avatar:"6666407ac3aa5af1d5de.jpg",_id:"-1"};function o(e,t,n,o,r,a){var c=e.querySelector(".card").cloneNode(!0),s=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-counter");return s.alt=t.name,s.src=t.link,c.querySelector(".card__title").textContent=t.name,i.addEventListener("click",(function(e){return n(e,t)})),u.addEventListener("click",(function(e){return o(e,t,l)})),l.textContent=t.likes.length,s.addEventListener("click",(function(){return r(t)})),t.owner._id!==a._id&&(i.style.display="None"),t.likes.some((function(e){return e._id===a._id}))&&u.classList.add("card__like-button_is-active"),c}function r(e,n){var o;(o=n._id,fetch("".concat(t.baseURL,"/cards/").concat(o),{headers:t.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){return e.target.closest(".card").remove()})).catch((function(e){return console.log("Ошибка: ".concat(e))}))}function a(e,n,o){var r;console.log(e,n,o),e.target.classList.toggle("card__like-button_is-active")?(r=n._id,fetch("".concat(t.baseURL,"/cards/likes/").concat(r),{headers:t.headers,method:"PUT"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){o.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка: ".concat(e))})):function(e){return fetch("".concat(t.baseURL,"/cards/likes/").concat(e),{headers:t.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n._id).then((function(e){o.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка: ".concat(e))}))}function c(e){e&&(e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),e.addEventListener("mousedown",u))}function s(e){e&&e.classList.contains("popup")&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),e.removeEventListener("mousedown",u))}function i(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function u(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&s(e.currentTarget)}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function d(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return d(e,n,t)})),l(n,o,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var m=document.querySelector(".places__list"),y=document.querySelector("#card-template").content,_=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),h=v.querySelector(".popup__button"),b=document.forms["edit-profile"],g=b.elements.name,S=b.elements.description,k=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),q=document.querySelector(".profile__add-button"),E=document.querySelector(".popup_type_new-card"),j=document.forms["new-place"],x=j.elements["place-name"],w=j.elements.link,A=E.querySelector(".popup__button"),P=document.querySelector(".popup_type_image"),U=P.querySelector(".popup__image"),R=P.querySelector(".popup__caption"),T=document.querySelector(".profile__avatar-button"),I=document.querySelector(".popup_type_edit_avatar"),O=document.forms["edit-avatar"],B=O.elements.link,D=document.querySelector(".profile__image"),N=I.querySelector(".popup__button"),M=document.querySelectorAll(".popup"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function z(e){U.src=e.link,U.alt=e.name,R.textContent=e.name,c(P)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);l(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){console.log(t),console.log(r),console.log(e),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(t,r,e),l(n,o,e)}))}))}))}(J),T.addEventListener("click",(function(e){B.value=D.style.backgroundImage.slice(4,-1).replace(/"/g,""),c(I),p(O,J)})),O.addEventListener("submit",(function(e){var n;e.preventDefault(),N.textContent="Сохранение...",(n=B.value,fetch("".concat(t.baseURL,"/users/me/avatar"),{headers:t.headers,method:"PATCH",body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){D.style.backgroundImage='url("'.concat(e.avatar,'")')})).catch((function(e){return console.log(e)})).finally((function(){s(I),N.textContent="Сохранить"}))})),_.addEventListener("click",(function(){g.value=k.textContent,S.value=L.textContent,c(v),p(b,J)})),b.addEventListener("submit",(function(e){var n,o;e.preventDefault(),h.textContent="Сохранение...",console.log(g.value,S.value),(n=g.value,o=S.value,fetch("".concat(t.baseURL,"/users/me"),{headers:t.headers,method:"PATCH",body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){k.textContent=e.name,L.textContent=e.about})).catch().finally((function(){s(v),h.textContent="Сохранить"}))})),q.addEventListener("click",(function(e){c(E),p(j,J)})),j.addEventListener("submit",(function(e){var n,c;e.preventDefault(),A.textContent="Сохранение...",(n=x.value,c=w.value,fetch("".concat(t.baseURL,"/cards"),{headers:t.headers,method:"POST",body:JSON.stringify({name:n,link:c})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){m.prepend(o(y,e,r,a,z,e.owner))})).catch().finally((function(){j.reset(),s(E),A.textContent="Сохранить"}))})),M.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&s(e)}))})),Promise.all([fetch("".concat(t.baseURL,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseURL,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,s=[],i=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=a.call(n)).done)&&(s.push(o.value),s.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw r}}return s}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=c[0],i=c[1];k.textContent=s.name,L.textContent=s.about,C.style.backgroundImage='url("'.concat(s.avatar,'")'),i.forEach((function(e){m.append(o(y,e,r,a,z,s))}))})).catch((function(t){console.error("Ошибка получения данных пользователя и карточек:",t),k.textContent=n.name,L.textContent=n.about,C.style.backgroundImage='url("'.concat(n.avatar,'")'),e.forEach((function(e){m.append(o(y,e,r,a,z,n))}))}))})();