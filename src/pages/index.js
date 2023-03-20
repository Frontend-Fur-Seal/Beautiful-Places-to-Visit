import './index.css';

  import Card from "../components/Card.js"
  import FormValidator from "../components/FormValidator.js";
  import Section from "../components/Section.js";
  import PopupWithForm from "../components/PopupWithForm.js"
  import UserInfo from "../components/UserInfo.js";
  import PopupWithImage from "../components/PopupWithImage.js"

  import {
    buttonNameChange,
    buttonAddPlace,
    formDetails,
    popupName,
    popupOccupation,
    elements,
    popupFullPhoto,
    popupChangeName,
    popupAddPlace,
    withoutImg,
    initialCards,
    selectors,
    validateSelectors
  } from '../utils/constants.js'


  const formValidatorPlace = new FormValidator(validateSelectors, popupAddPlace);
  formValidatorPlace.enableValidation();
 
  const formValidatorName = new FormValidator(validateSelectors, popupChangeName);
  formValidatorName.enableValidation();

  const createPopupAddPlace = new PopupWithForm(popupAddPlace, handleFormSubmitPlace);
  createPopupAddPlace.setEventListeners();

  const createPopupProfileEdit = new PopupWithForm(popupChangeName, handleFormSubmitDetails);
  createPopupProfileEdit.setEventListeners();

  const createPopupFullImg = new PopupWithImage(popupFullPhoto);
  createPopupFullImg.setEventListeners();

  const personalDetails = {
    profileName: '.profile__name',
    profileOccupation: '.profile__occupation'
  }

  function createNewCard(item){
    const card = new Card(
      item, 
      '#element-template', 
      selectors, 
      {handleCardClick: (name, link) => {
        createPopupFullImg.openPopup(name, link);
      }});
    const cardElement = card.generateCard();
    return cardElement
  }

const createCardStaticList = new Section({
  items: initialCards,
  renderer: (elem) => {
    createNewCard(elem);
    createCardStaticList.addItem(createNewCard(elem));
  }
}, elements);

createCardStaticList.renderItems();


function openPopupAddPlace(){
  createPopupAddPlace.openPopup();
  formValidatorPlace.resetOpnForm();
}

const userDetails = new UserInfo(personalDetails);

function openPopupProfileEdit (){

  popupName.value = userDetails.getUserInfo().profileName;
  popupOccupation.value = userDetails.getUserInfo().profileOccupation;

  createPopupProfileEdit.openPopup();
  formValidatorName.resetOpnForm();
}

function handleFormSubmitDetails(evt) {
  evt.preventDefault(); 

  userDetails.setUserInfo(popupName.value, popupOccupation.value);

  createPopupProfileEdit.closePopup();
}

function handleFormSubmitPlace(evt) {

  evt.preventDefault();

  const placeName = this.popupPlaceName.value;
  const placeLink = this.popupPlaceLink.value;

  const title = {
    name: placeName,
    link: placeLink
  }

  if(!(isValidUrl(title.link))){
    title.link = withoutImg;
  }

  document.querySelector(elements).prepend(createNewCard(title)); // ПОМЕНЯЙ!

  evt.target.reset();

  createPopupAddPlace.closePopup();    

}   

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)*$/;
  return pattern.test(url);
}

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

