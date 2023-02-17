  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  const buttonNameChange = document.querySelector(".profile__button-name-change");
  const buttonAddPlace = document.querySelector(".profile__button-add-place");
  const popupChangeName = document.querySelector('.popup_name-change');
  const popupAddPlace = document.querySelector('.popup_add-place');
  const formDetails = document.forms.persDetails;
  const popupName = formDetails.querySelector(".popup__content_type_name");
  const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  const forms = document.querySelectorAll('.popup__form');
  const popupContainer = document.querySelector('.popup__container');
  const formAddPlace = document.forms.addPlace;
  const popupNamePlace = formAddPlace.querySelector(".popup__content_type_name-place");
  const popupLink = formAddPlace.querySelector('.popup__content_type_link');
  const popupFullPhoto = document.querySelector('.popup_full-img');
  const closeButtons = document.querySelectorAll('.popup__close');
  const submitPopup = document.querySelector('.popup__submit');
  const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
  const elements = document.querySelector('.elements');
  const popups = document.querySelectorAll('.popup');
  const popupImage = document.querySelector('.popup__image');
  const popupFigcaption = document.querySelector('.popup__figcaption');


// функция открытия попапа

function openPopup(popup){
  popup.classList.add('popup_opened');
  this.addEventListener('keydown', closePopupEsc);
  enableValidation();
}

// функция открытия попапа добавление карточки


function openPopupAddPlace(){
  openPopup(popupAddPlace);
}

// функция открытия попапа изменение данных профиля

function openPopupProfileEdit(){
  openPopup(popupChangeName);
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
}

// функция открытия попапа с картинкой

function openPopupFullImg(e){
  openPopup(popupFullPhoto);
  popupImage.src = e.target.src;
  popupFigcaption.textContent = e.target.getAttribute('alt');
  popupImage.alt = popupFigcaption.textContent;

}

//функция удаления попапа 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  this.removeEventListener('keydown', closePopupEsc);
}

//функция закрытия попапа по кнопке esc

function closePopupEsc(evt){
  if(evt.keyCode === 27){
    popups.forEach((elem) => {
      if(elem.classList.contains('popup_opened')){
        closePopup(elem);
      }
    })
  } 
}


const initialCards = [
  {
    name: 'Кольский полуостров',
    link: 'images/kola-peninsula.jpg'
  },
  {
    name: 'Ладожское озеро',
    link: 'images/ladozhskoe-ozero.jpg'
  },
  {
    name: 'Плато-Путорана',
    link: 'images/plato-putorana.jpg'
  },
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
  },
  {
    name: 'Соловецкие острова',
    link: 'images/solovky.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  }
]; 

//функция лайк

function addLike(){
  this.classList.toggle('element__like_active');
}

//функция удаления карточки

function deleteElement(evt){
evt.target.closest('.element').remove();
}

//функция вставки карточки из статичного списка

function templateCard(){
    const cards = initialCards.map(function(item){
    
      return createCards(item);
 
  });
  elements.append(...cards);
}

//функция создания карточки и слушателей

templateCard();

function createCards(item){
  const card = elementTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__photo').src = item.link;
  card.querySelector('.element__photo').setAttribute('alt', item.name);
  card.querySelector('.element__photo').addEventListener('click', openPopupFullImg);
  card.querySelector('.element__like').addEventListener('click', addLike);
  card.querySelector('.element__delete').addEventListener('click', deleteElement);

  return card
};

//функция на сабмит попапа с добавлением новой карточки

function handleFormSubmitPlace(evt) {

  evt.preventDefault();

  const placeName = this.popupPlaceName.value;
  const placeLink = this.popupPlaceLink.value;

  const title = {
    name: placeName,
    link: placeLink
  }

    if(!(title.name)){
      title.name = 'Изображение не загружено';
    }

    if(!(title.link.includes('http'))){
      title.link = 'images/not-photo.jpg';
    }

  const card = createCards(title);

  elements.prepend(card);

  evt.target.reset();

  const submitPopup = evt.target.closest('.popup');
  closePopup(submitPopup);

}

//функция сабмит для попапа редактирования данных профиля

function handleFormSubmitDetails(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;

  const submitPopup = evt.target.closest('.popup');
  closePopup(submitPopup);
}

//слушатели на кнопки сабмит попапов с формами

formAddPlace.addEventListener("submit", handleFormSubmitPlace);
formDetails.addEventListener("submit", handleFormSubmitDetails);

//Слушатели клика на кнопки открывающие формы

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

//слушатели на закрытие попапа

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//слушатели закрытия попапа кликом на оверлей

popups.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    if(elem === evt.target){
      closePopup(elem);
    }
  })
});


