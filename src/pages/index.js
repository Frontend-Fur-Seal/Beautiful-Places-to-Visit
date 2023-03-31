import './index.css';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js"
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
  initialCards,
  createNewCardObject,
  formValidatorPlaceObject,
  personalDetails,
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

// const createPopupDeleteCard = new Popup(popupDeleteCard); - перенести в класс аватара
//createPopupDeleteCard.setEventListeners();

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
/*
const createPopupAvatarEdit = new PopupWithForm(popupAvatarChange, 
  {handleFormSubmit: (formData) => {

    createPopupProfileEdit.closePopup();
  }
});

createPopupAvatarEdit.setEventListeners(); ПОПРАВИТЬ
*/
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

/*
function openPopupAvatarChange(){

  createPopupAvatarEdit.openPopup();
} // добавить в инпут подгрузку src с сервера

avatarContainer.addEventListener('click', openPopupAvatarChange)//оставить
*/

function openPopupProfileEdit (){

  popupName.value = userDetails.getUserInfo().name;
  popupOccupation.value = userDetails.getUserInfo().occupation;

  createPopupProfileEdit.openPopup();
  formValidatorName.resetOpnForm();
}

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);


/*
function openPopupAgreeDelCard(){
  createPopupDeleteCard.openPopup();
}

const test = document.querySelector(createNewCardObject.deleteElement);
const testbuttonchangeavatar = document.querySelector('.profile__avatar-container');


function avatarHover(evt){
 if (evt.type == 'mouseenter'){
  changeAvatarButton.style.zIndex = '10';
  profileAvatar.style.opacity = '.8';
 }if (evt.type == 'mouseleave'){
  changeAvatarButton.style.zIndex = '1';
  profileAvatar.style.opacity = '1';
 }
}


test.addEventListener('click', openPopupAgreeDelCard);

testbuttonchangeavatar.addEventListener('mouseenter', avatarHover);
testbuttonchangeavatar.addEventListener('mouseleave', avatarHover);

/*
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
});  

*/
/*
  fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
  method: 'GET',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then((result) => {
  result.forEach((element) => {
    createCardStaticList.addItem(createNewCard(element));
  })
})
*/