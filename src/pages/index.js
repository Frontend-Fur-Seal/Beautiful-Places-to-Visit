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
  changeAvatar,
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
import { Promise } from 'core-js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
}); 

const userDetails = new UserInfo(personalDetails);

const createCardStaticList = new Section({
  renderer: (elem) => {
    createNewCard(elem);
    createCardStaticList.addItem(createNewCard(elem));
  }
}, elements);

Promise.all([api.getInitialUser(), api.getInitialCards()])
.then(([user, cards]) => {
  userDetails.setUserInfo(user.name, user.about);
  userDetails.setUserAvatar(user.avatar);
  createCardStaticList.renderItems(cards);
})

//НЕ ТРОГАТЬ, ВСЕ РАБОТАЕТ

const formValidatorPlace = new FormValidator(formValidatorPlaceObject, addPlaceForm);
const formValidatorName = new FormValidator(formValidatorPlaceObject, userInfoForm);
const formValidatorChangeAvatar = new FormValidator(formValidatorPlaceObject, changeAvatar);

formValidatorPlace.enableValidation();
formValidatorName.enableValidation();
formValidatorChangeAvatar.enableValidation();

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

const createPopupFullImg = new PopupWithImage(popupFullPhoto);
createPopupFullImg.setEventListeners();

const createPopupAvatarEdit = new PopupWithForm(popupAvatarChange, 
  {handleFormSubmit: (formData) => {
    api.postInitialUserAvatar({avatar: formData['popupAvatarLink']})
    .then((result) => {
      userDetails.setUserAvatar(result.avatar)
    })
    createPopupAvatarEdit.closePopup();
  }
});

function openPopupAvatarChange(){

  api.getInitialUser()
  .then((result) => {
    popupAvatar.value = result.avatar;
    })

  createPopupAvatarEdit.openPopup();
} 

createPopupAvatarEdit.setEventListeners(); 

function avatarHover(evt){
 if (evt.type == 'mouseenter'){
  changeAvatarButton.style.zIndex = '10';
  profileAvatar.style.opacity = '.8';
 }if (evt.type == 'mouseleave'){
  changeAvatarButton.style.zIndex = '1';
  profileAvatar.style.opacity = '1';
 }
}

avatarContainer.addEventListener('click', openPopupAvatarChange)
avatarContainer.addEventListener('mouseenter', avatarHover);
avatarContainer.addEventListener('mouseleave', avatarHover);


//НЕ ТРОГАТЬ, ВСЕ РАБОТАЕТ

function createNewCard(item){
  const card = new Card(
    item, 
    '#element-template', 
    createNewCardObject, 
    {checkuserId: (ownerId, delElement, likeMassive, cardLike) => {
      api.getInitialUser()
      .then((result) => {
        if(result._id != ownerId){
        delElement.style.display = 'none'
      }
      likeMassive.forEach(element => {
        if(element._id === result._id){
          cardLike.classList.add('element__like_active');
        }
      })
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


const createPopupAddPlace = new PopupWithForm(popupAddPlace, 

  {handleFormSubmit: (formData) => {

      api.postInitialCard({
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink']
      })
      .then((result) => {
        console.log(result)
        createCardStaticList.renderItems(result);
    })
      createPopupAddPlace.closePopup();   
    }});

createPopupAddPlace.setEventListeners();
 
//не работает сабмит удаления карты

const submitCardDelete = new PopupCardDelete(popupDeleteCard, {submitCardDelete: (elementId) => {
  console.log(elementId);
  submitCardDelete.closePopup();
}})

//

function openPopupAddPlace(){
  createPopupAddPlace.openPopup();
  formValidatorPlace.resetOpnForm();
}

buttonAddPlace.addEventListener('click', openPopupAddPlace);






