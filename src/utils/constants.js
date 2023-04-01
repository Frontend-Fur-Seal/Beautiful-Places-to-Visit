  export const buttonNameChange = document.querySelector(".profile__button-name-change");
  export const buttonAddPlace = document.querySelector(".profile__button-add-place");
  export const userInfoForm = document.forms.persDetails;
  export const addPlaceForm = document.forms.addPlace;
  export const changeAvatar = document.forms.avatarChange;
  export const popupName = userInfoForm.querySelector(".popup__content_type_name");
  export const popupAvatar = changeAvatar.querySelector(".popup__content_type_avatar-link");
  export const popupOccupation = userInfoForm.querySelector(".popup__content_type_occupation");
  export const popupFullPhoto = document.querySelector('.popup_full-img');
  export const popupChangeName = document.querySelector('.popup_name-change');
  export const popupAddPlace = document.querySelector('.popup_add-place');
  export const kolaPeninsula = new URL('../images/kola-peninsula.jpg', import.meta.url);
  export const ladoga = new URL('../images/ladozhskoe-ozero.jpg', import.meta.url);
  export const platoPutorana = new URL('../images/plato-putorana.jpg', import.meta.url);
  export const ruskeala = new URL('../images/ruskeala.jpg', import.meta.url);
  export const solovky = new URL('../images/solovky.jpg', import.meta.url);
  export const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
 
  export const changeAvatarButton = document.querySelector('.profile__avatar_type_hover');
  export const buttonChangeAvatar = new URL('../images/change-name.svg', import.meta.url);
  export const popupDeleteCard = document.querySelector('.popup_delete-agree');
  export const profileAvatar = document.querySelector('.profile__avatar');
  export const avatarContainer = document.querySelector('.profile__avatar-container');
  export const popupAvatarChange = document.querySelector('.popup_avatar-change');


  export const elements = '.elements';

  export const initialCards = [
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

  export const createNewCardObject = {
    nameElement: '.element__name',
    photoElement: '.element__photo',
    likeElement: '.element__like',
    deleteElement: '.element__delete',
    element: '.element',
  }

  export const formValidatorPlaceObject = {
    formSelectors: '.popup__form',
    inputSelectors: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive', 
    errorInput: 'popup__input_error',
    errorClass: 'popup__message-error_active'
  }

  export const personalDetails = {
    profileName: document.querySelector('.profile__name'),
    profileOccupation: document.querySelector('.profile__occupation'),
    avatar: document.querySelector('.profile__avatar')
  }
  