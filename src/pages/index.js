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
  changeAvatarButton,
  profileAvatar,
  personalDetails,
  popupAvatarChange,
  popupAvatar,
  avatarContainer
} from '../utils/constants.js'
import Popup from '../components/Popup';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
}); 

api.getInitialUser()
.then((result) => {
  personalDetails.profileName.textContent = result.name;
  personalDetails.profileOccupation.textContent =  result.about;
  personalDetails.avatar.src = result.avatar;
})


export const formValidatorPlace = new FormValidator(formValidatorPlaceObject, addPlaceForm);
export const formValidatorName = new FormValidator(formValidatorPlaceObject, userInfoForm);


formValidatorPlace.enableValidation();
formValidatorName.enableValidation();

api.getInitialCards()
.then((result) => {
  const createCardStaticList = new Section({
    items: result,
    renderer: (elem) => {
      createNewCard(elem);
      createCardStaticList.addItem(createNewCard(elem));
    }
  }, elements);

  createCardStaticList.renderItems();
})



// const createPopupDeleteCard = new Popup(popupDeleteCard); - перенести в класс аватара
//createPopupDeleteCard.setEventListeners();

const createPopupAddPlace = new PopupWithForm(popupAddPlace, 

  {handleFormSubmit: (formData) => {

    const title = { 
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink'] 
      } 

      //createCardStaticList.addItem(createNewCard(title));

      createPopupAddPlace.closePopup();   
    }});

createPopupAddPlace.setEventListeners();

const userDetails = new UserInfo(personalDetails);

const createPopupProfileEdit = new PopupWithForm(popupChangeName, 
  {handleFormSubmit: (formData) => {

    api.getInitialUser().then(result => console.log(result));
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




function openPopupAddPlace(){
  createPopupAddPlace.openPopup();
  formValidatorPlace.resetOpnForm();
}


function openPopupProfileEdit (){

api.getInitialUser()
.then((result) => {
  popupName.value = result.name;
  popupOccupation.value = result.about;
  })

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
test.addEventListener('click', openPopupAgreeDelCard);

*/

function openPopupAvatarChange(){

  api.getInitialUser()
  .then((result) => {
    popupAvatar.value = result.avatar;
    })

  createPopupAvatarEdit.openPopup();
} 

avatarContainer.addEventListener('click', openPopupAvatarChange)//оставить


const createPopupAvatarEdit = new PopupWithForm(popupAvatarChange, 
  {handleFormSubmit: (formData) => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: formData['popup__content_type_avatar-link']
  })
}); 
    personalDetails.avatar.src = formData['popup__content_type_avatar-link'];
    createPopupProfileEdit.closePopup();
  }
});

createPopupAvatarEdit.setEventListeners(); 

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
function comparisonId(userId){
  if(userId === '8a273213ce87337e742d70d2'){
    console.log('eto ya')
  }else{
    console.log('eto ne ya')
  }
}

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
    //console.log(element.owner._id)//писать сюда функцию, которая принимает id owner и сравнивает со своим id
    comparisonId(element.owner._id)
  })
  })

  fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
  method: 'GET',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result)
  })

  */

