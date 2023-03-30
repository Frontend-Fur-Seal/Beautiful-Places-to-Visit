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
  userInfoForm,
  addPlaceForm,
  popupFullPhoto,
  popupChangeName,
  popupAddPlace,
  profileAvatar,
  popupDeleteCard,
  initialCards,
  createNewCardObject,
  formValidatorPlaceObject,
  personalDetails,
  changeAvatarButton,
  buttonChangeAvatar
} from '../utils/constants.js'
import Popup from '../components/Popup';


export const formValidatorPlace = new FormValidator(formValidatorPlaceObject, addPlaceForm);
export const formValidatorName = new FormValidator(formValidatorPlaceObject, userInfoForm);

formValidatorPlace.enableValidation();
formValidatorName.enableValidation();

const createCardStaticList = new Section({
  items: initialCards,
  renderer: (elem) => {
    createNewCard(elem);
    createCardStaticList.addItem(createNewCard(elem));
  }
}, elements);

const createPopupDeleteCard = new Popup(popupDeleteCard);
createPopupDeleteCard.setEventListeners();

const createPopupAddPlace = new PopupWithForm(popupAddPlace, 

  {handleFormSubmit: (formData) => {

    const title = { 
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink'] 
      } 

      createCardStaticList.addItem(createNewCard(title));

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
    createNewCardObject, 
    {handleCardClick: (name, link) => {
      createPopupFullImg.openPopup(name, link);
    }});
  const cardElement = card.generateCard();
  return cardElement
}

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

function openPopupAgreeDelCard(){
  createPopupDeleteCard.openPopup();
}

const test = document.querySelector(createNewCardObject.deleteElement);
const testbuttonchangeavatar = document.querySelector('.profile__avatar-container');


function avatarHover(evt){
 if (evt.type == 'mouseenter'){
  evt.target.style.zIndex = '5;'
 }if (evt.type == 'mouseleave'){
  
 }
}


test.addEventListener('click', openPopupAgreeDelCard);
buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);
changeAvatarButton.addEventListener('mouseenter', avatarHover);
changeAvatarButton.addEventListener('mouseleave', avatarHover);

