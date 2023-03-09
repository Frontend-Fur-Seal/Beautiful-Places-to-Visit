import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonNameChange = document.querySelector(".profile__button-name-change");
const buttonAddPlace = document.querySelector(".profile__button-add-place");
const popupChangeName = document.querySelector('.popup_name-change');
const popupAddPlace = document.querySelector('.popup_add-place');
const formDetails = document.forms.persDetails;
const popupName = formDetails.querySelector(".popup__content_type_name");
const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
const formAddPlace = document.forms.addPlace;
const closeButtons = document.querySelectorAll('.popup__close');
const elements = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');


const popupFullPhoto = document.querySelector('.popup_full-img');
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

const initialCards = [
  {
    name: 'Кольский полуостров',
    link: 'images/kola-peninsula.jpg'
  },
  {
    name: 'Ладожское озеро',
    link: 'images/ladozhskoe-ozero.jpg'
  },
  {
    name: 'Плато-Путорана',
    link: 'images/plato-putorana.jpg'
  },
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
  },
  {
    name: 'Соловецкие острова',
    link: 'images/solovky.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  }
]

const selectors = {
  nameElement: '.element__name',
  photoElement: '.element__photo',
  likeElement: '.element__like',
  deleteElement: '.element__delete',
  element: '.element',
}

const validateSelectors = {
  formSelectors: '.popup__form',
  inputSelectors: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive', 
  errorInput: 'popup__input_error',
  errorClass: 'popup__message-error_active'
}

//создание карточек из статичного списка

function createCard(item) {
  const card = new Card(item, '#element-template', selectors, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

initialCards.forEach((item) => {
  elements.append(createCard(item));
});

function handleCardClick(name, link) {
  popupImage.src = link;
  popupFigcaption.textContent = name;
  popupImage.alt = popupFigcaption.textContent;
  openPopup(popupFullPhoto);
}

//создание экземпляра класса

const formValidatorPlace = new FormValidator(validateSelectors, '.popup_add-place')
formValidatorPlace.enableValidation();

const formValidatorName = new FormValidator(validateSelectors, '.popup_name-change')
formValidatorName.enableValidation();

//функция открытия попапа 

 function openPopup(popup){
  
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия попапа 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//функция сабмит попапа добавления карточки

function handleFormSubmitPlace(evt) {

  evt.preventDefault();

  const placeName = this.popupPlaceName.value;
  const placeLink = this.popupPlaceLink.value;

  const title = {
    name: placeName,
    link: placeLink
  }

  if(!(isValidUrl(title.link))){
    title.link = 'images/not-photo.jpg'
  }

  elements.prepend(createCard(title));

  evt.target.reset();

  const submitPopup = evt.target.closest('.popup');
  
  closePopup(submitPopup);

}    

// функция открытия попапа добавление карточки

function openPopupAddPlace(){
openPopup(popupAddPlace);

}

// функция открытия попапа изменение данных профиля

function openPopupProfileEdit (){
openPopup(popupChangeName);
popupName.value = profileName.textContent;
popupOccupation.value = profileOccupation.textContent;
}

//функция закрытия попапа по кнопке esc

function closePopupEsc(evt){
if(evt.key === 'Escape'){
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
} 
}

//проверка введенного url

function isValidUrl(url) {
const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)*$/;
return pattern.test(url);
}

//функция сабмит для попапа редактирования данных профиля

function handleFormSubmitDetails(evt) {
evt.preventDefault(); 
profileName.textContent = popupName.value;
profileOccupation.textContent = popupOccupation.value;

const submitPopup = evt.target.closest('.popup');
closePopup(submitPopup);
}

//слушатели на кнопки сабмит попапов с формами

formAddPlace.addEventListener("submit", handleFormSubmitPlace);
formDetails.addEventListener("submit", handleFormSubmitDetails);

//Слушатели клика на кнопки открывающие формы

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

//слушатели на закрытие попапа

closeButtons.forEach((button) => {
const popup = button.closest('.popup');
button.addEventListener('click', () => closePopup(popup));
});

//слушатели закрытия попапа кликом на оверлей

popups.forEach((elem) => {
elem.addEventListener('click', (evt) => {
  if(elem === evt.target){
    closePopup(elem);
  }
})
});