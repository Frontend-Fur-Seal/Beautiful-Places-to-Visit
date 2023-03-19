import './index.css';

  import Card from "../components/Card.js"
  import FormValidator from "../components/FormValidator.js";
  import Section from "../components/Section.js";
  import PopupWithForm from "../components/PopupWithForm.js"
  import UserInfo from "../components/UserInfo.js";
  import PopupWithImage from "../components/PopupWithImage.js"

  const buttonNameChange = document.querySelector(".profile__button-name-change");
  const buttonAddPlace = document.querySelector(".profile__button-add-place");
  const formDetails = document.forms.persDetails;
  const popupName = formDetails.querySelector(".popup__content_type_name");
  const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  const elements = document.querySelector('.elements');
  const popupFullPhoto = document.querySelector('.popup_full-img');
  const popupChangeName = document.querySelector('.popup_name-change');
  const popupAddPlace = document.querySelector('.popup_add-place');

  const kolaPeninsula = new URL('../images/kola-peninsula.jpg', import.meta.url);
  const ladoga = new URL('../images/ladozhskoe-ozero.jpg', import.meta.url);
  const platoPutorana = new URL('../images/plato-putorana.jpg', import.meta.url);
  const ruskeala = new URL('../images/ruskeala.jpg', import.meta.url);
  const solovky = new URL('../images/solovky.jpg', import.meta.url);
  const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url)
  const withoutImg = new URL('../images/not-photo.jpg', import.meta.url)

  const initialCards = [
    {
      name: 'Кольский полуостров',
      link: kolaPeninsula
    },
    {
      name: 'Ладожское озеро',
      link: ladoga
    },
    {
      name: 'Плато-Путорана',
      link: platoPutorana
    },
    {
      name: 'Рускеала',
      link: ruskeala
    },
    {
      name: 'Соловецкие острова',
      link: solovky
    },
    {
      name: 'Камчатка',
      link: kamchatka
    }
  ]; 

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

  const formValidatorPlace = new FormValidator(validateSelectors, popupAddPlace);
  formValidatorPlace.enableValidation();
 
  const formValidatorName = new FormValidator(validateSelectors, popupChangeName);
  formValidatorName.enableValidation();

  const createPopupAddPlace = new PopupWithForm(popupAddPlace, handleFormSubmitPlace, formValidatorPlace);
  createPopupAddPlace.setEventListeners();

  const createPopupProfileEdit = new PopupWithForm(popupChangeName, handleFormSubmitDetails, formValidatorName);
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
}

const userDetails = new UserInfo(personalDetails);

function openPopupProfileEdit (){

  popupName.value = userDetails.getUserInfo().profileName;
  popupOccupation.value = userDetails.getUserInfo().profileOccupation;

  createPopupProfileEdit.openPopup();
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

  elements.prepend(createNewCard(title));

  evt.target.reset();

  createPopupAddPlace.closePopup();    

}   

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)*$/;
  return pattern.test(url);
}

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

