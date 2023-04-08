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
  avatarContainer,
  popupDeleteCard,
  likesQuantity,
  likesContainer
} from '../utils/constants.js'
import Popup from '../components/Popup';
import PopupCardDelete from '../components/PopupCardDelete';

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
  personalDetails.profileOccupation.textContent = result.about;
  personalDetails.avatar.src = result.avatar;
})


export const formValidatorPlace = new FormValidator(formValidatorPlaceObject, addPlaceForm);
export const formValidatorName = new FormValidator(formValidatorPlaceObject, userInfoForm);

formValidatorPlace.enableValidation();
formValidatorName.enableValidation();

function createNewCard(item){
  const card = new Card(
    item, 
    '#element-template', 
    createNewCardObject, 
    {checkuserId: (ownerId, delElement) => {
      api.getInitialUser()
      .then((result) => {
        if(result._id != ownerId){
        delElement.style.display = 'none'
      }
    })
    }},
    {handleCardClick: (name, link) => {
      createPopupFullImg.openPopup(name, link);
    }},
    {handleCardDelete: (element, cardId) => {

    }},
    {handleCardLike: (likeElement, cardId, likes) => {
      likeElement.classList.toggle('element__like_active');
        if(likeElement.classList.contains('element__like_active')){
          api.putLike(cardId)
          .then((result) => {
            likes.textContent = result.likes.length;
          });
        }else{
          api.deleteLike(cardId)
          .then((result) => {
            likes.textContent = result.likes.length;
          });
        }
    }},
    api);
  const cardElement = card.generateCard();
  return cardElement
}

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

const createPopupAddPlace = new PopupWithForm(popupAddPlace, 

  {handleFormSubmit: (formData) => {

      api.postInitialCard({
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink']
      })
      .then((result) => {
        console.log(result)
      })

      createPopupAddPlace.closePopup();   
    }});

createPopupAddPlace.setEventListeners();

const userDetails = new UserInfo(personalDetails);

const createPopupProfileEdit = new PopupWithForm(popupChangeName, 
  {handleFormSubmit: (formData) => {


    api.postInitialUser({
      name: formData['popup__content_type_name'], 
      about: formData['popup__content_type_occupation']
    })
    .then((result) => {
      userDetails.setUserInfo(result.name, result.about);
    })
    createPopupProfileEdit.closePopup();
  }
});

createPopupProfileEdit.setEventListeners();

const createPopupFullImg = new PopupWithImage(popupFullPhoto);
createPopupFullImg.setEventListeners();
 
const submitCardDelete = new PopupCardDelete(popupDeleteCard, {submitCardDelete: (elementId) => {
  console.log(elementId);
  submitCardDelete.closePopup();
}})

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
    api.postInitialUserAvatar({avatar: formData['popupAvatarLink']})
    createPopupAvatarEdit.closePopup();
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



