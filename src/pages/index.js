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
    popupName,
    popupOccupation,
    elements,
    popupFullPhoto,
    popupChangeName,
    popupAddPlace,
    withoutImg,
    initialCards,
    selectors,
    validateSelectors,
    personalDetails

  } from '../utils/constants.js'

  export const formValidatorPlace = new FormValidator(validateSelectors, popupAddPlace);
  export const formValidatorName = new FormValidator(validateSelectors, popupChangeName);

  formValidatorPlace.enableValidation();
  formValidatorName.enableValidation();

  const createPopupAddPlace = new PopupWithForm(popupAddPlace, 
    {handleFormSubmit: (formData) => {
     
      const title = { 
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink'] 
      } 
      
      if(!(formValidatorPlace.isValidUrl(title.link))){ 
        title.link = withoutImg; 
      } 

      document.querySelector(elements).prepend(createNewCard(title)); 
  
      createPopupAddPlace.closePopup();   
    }});

  createPopupAddPlace.setEventListeners();

  const userDetails = new UserInfo(personalDetails);

  const createPopupProfileEdit = new PopupWithForm(popupChangeName, 
    {handleFormSubmit: (formData) => {
      userDetails.setUserInfo(formData['popup__content_type_name'], formData['popup__content_type_occupation']);
      createPopupProfileEdit.closePopup();
    }
  });

  createPopupProfileEdit.setEventListeners();

  const createPopupFullImg = new PopupWithImage(popupFullPhoto);
  createPopupFullImg.setEventListeners();


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


function openPopupProfileEdit (){

  popupName.value = userDetails.getUserInfo().name;
  popupOccupation.value = userDetails.getUserInfo().occupation;

  createPopupProfileEdit.openPopup();
  formValidatorName.resetOpnForm();
}

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

