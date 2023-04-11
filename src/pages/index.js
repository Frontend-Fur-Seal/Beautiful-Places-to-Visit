import './index.css';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
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
  createNewCardObject,
  formValidatorPlaceObject,
  changeAvatarButton,
  profileAvatar,
  personalDetails,
  popupAvatarChange,
  popupAvatar,
  avatarContainer,
  popupDeleteCard
} from '../utils/constants.js'

import { Promise } from 'core-js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '48d89f1d-6744-44c2-a9bf-a035b070ab5d',
    'Content-Type': 'application/json'
  }
}); 

const userDetails = new UserInfo(personalDetails);

const deleteCard = new PopupCardDelete(popupDeleteCard);
deleteCard.setEventListeners();

const createCardStaticList = new Section({
  renderer: (elem) => {
    createCardStaticList.addItemAppend(createNewCard(elem));
  }
}, elements);

let userId = null;

Promise.all([api.getInitialUser(), api.getInitialCards()])
.then(([user, cards]) => {
  userId = user._id;
  userDetails.setUserInfo(user.name, user.about);
  userDetails.setUserAvatar(user.avatar);
  createCardStaticList.renderItems(cards);
  userDetails.getUserInfo();
})
.catch((error) => console.log(error))


const formValidatorPlace = new FormValidator(formValidatorPlaceObject, addPlaceForm);
const formValidatorName = new FormValidator(formValidatorPlaceObject, userInfoForm);
const formValidatorChangeAvatar = new FormValidator(formValidatorPlaceObject, changeAvatar);

formValidatorPlace.enableValidation();
formValidatorName.enableValidation();
formValidatorChangeAvatar.enableValidation();

const createPopupProfileEdit = new PopupWithForm(popupChangeName, 
  {handleFormSubmit: (formData) => {
    createPopupProfileEdit.loadedtext('Сохранение...')
    api.postInitialUser({
      name: formData['popup__content_type_name'], 
      about: formData['popup__content_type_occupation']
    })
    .then((result) => {
      userDetails.setUserInfo(result.name, result.about);
      createPopupProfileEdit.closePopup();
    })
    .catch((error) => console.log(error))
    .finally(createPopupProfileEdit.loadedtext('Сохранить'))
  }
});

createPopupProfileEdit.setEventListeners();

function openPopupProfileEdit (){
      popupName.value = userDetails.getUserInfo().name;
      popupOccupation.value = userDetails.getUserInfo().about;

    createPopupProfileEdit.openPopup();
    formValidatorName.resetOpnForm();
  }
  
  buttonNameChange.addEventListener('click', openPopupProfileEdit);

const createPopupFullImg = new PopupWithImage(popupFullPhoto);
createPopupFullImg.setEventListeners();

const createPopupAvatarEdit = new PopupWithForm(popupAvatarChange, 
  {handleFormSubmit: (formData) => {
    createPopupAvatarEdit.loadedtext('Сохранение...')
    api.postInitialUserAvatar({avatar: formData['popupAvatarLink']})
    .then((result) => {
      userDetails.setUserAvatar(result.avatar);
      createPopupAvatarEdit.closePopup();
    })
    .catch((error) => console.log(error))
    .finally(createPopupAvatarEdit.loadedtext('Сохранить'))
  }
});

function openPopupAvatarChange(){
  createPopupAvatarEdit.openPopup();
  formValidatorChangeAvatar.resetOpnForm();
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

function addedLikes(likeElement, cardId, likesQuantity){
  if(likeElement.classList.contains('element__like_active')){
    api.putLike(cardId)
    .then((result) => {
      likesQuantity.textContent = result.likes.length;
    })
    .catch((error) => console.log(error));
  }else{
    api.deleteLike(cardId)
    .then((result) => {
      likesQuantity.textContent = result.likes.length;
    })
    .catch((error) => console.log(error));
  }
}

function createNewCard(item){
  const card = new Card(
    userId,
    item, 
    '#element-template', 
    createNewCardObject, 
    {handleCardClick: (name, link) => {
      createPopupFullImg.openPopup(name, link);
    }},
    {handleCardDelete: (card) => {
      deleteCard.openPopup();
      deleteCard.setSubmitAction(() => {
        api.cardDelete(card._id)
        .then(() => {
          card.submitCardDelete();
          deleteCard.closePopup();
        })
        .catch((error) => console.log(error))
      })
      }
    },
    {handleCardLike: (likeElement, cardId, likesQuantity) => {
      likeElement.classList.toggle('element__like_active');
      addedLikes(likeElement, cardId, likesQuantity);
    }});
  const cardElement = card.generateCard();
  return cardElement
}

function openPopupAddPlace(){
  createPopupAddPlace.openPopup();
  formValidatorPlace.resetOpnForm();
}

const createPopupAddPlace = new PopupWithForm(popupAddPlace, 

  {handleFormSubmit: (formData) => {
    createPopupAddPlace.loadedtext('Сохранение...');
      api.postInitialCard({
        name: formData['popupPlaceName'], 
        link: formData['popupPlaceLink']
      })
      .then((result) => {
        createCardStaticList.addItemPrepend(createNewCard(result));
        createPopupAddPlace.closePopup(); 
    })
      .catch((error) => console.log(error))
      .finally(createPopupAddPlace.loadedtext('Создать'))  
    }});

createPopupAddPlace.setEventListeners();

buttonAddPlace.addEventListener('click', openPopupAddPlace);






