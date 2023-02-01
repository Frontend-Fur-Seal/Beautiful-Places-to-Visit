  let profileName = document.querySelector(".profile__name");
  let profileOccupation = document.querySelector(".profile__occupation");
  let buttonNameChange = document.querySelector(".profile__button-name-change");
  let buttonAddPlace = document.querySelector(".profile__button-add-place");
  let popupChangeName = document.querySelector('.popup_name-change');
  let popupAddPlace = document.querySelector('.popup_add-place');
  let formDetails = document.forms.persDetails;
  let popupName = formDetails.querySelector(".popup__content_type_name");
  let popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  let forms = document.querySelectorAll('.popup__form');
  let popupContainer = document.querySelector('.popup__container');
  let formAddPlace = document.forms.addPlace;
  let popupNamePlace = formAddPlace.querySelector(".popup__content_type_name-place");
  let popupLink = formAddPlace.querySelector('.popup__content_type_link');
  let popupFullPhoto = document.querySelector('.popup_full-img');
  let closePopup = document.querySelector(".popup__close");
  let submitPopup = document.querySelector('.popup__submit');
  const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
  const elements = document.querySelector('.elements');
  let popup = document.querySelectorAll('.popup');

// функция открытия попапа добавление карточки

function popupOpnAddPlace(){
  popupAddPlace.classList.add('popup_opened');

}

// функция открытия попапа изменение данных профиля

function popupOpnProfileEdit(){
  popupChangeName.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
}

// функция открытия попапа с картинкой

function popupOpnFullImg(e){
  
  popupFullPhoto.classList.add('popup_opened');
  popupFullPhoto.querySelector('.popup__image').src = e.target.src;

  popupFullPhoto.querySelector('.popup__figcaption').textContent = e.target.getAttribute('alt');

}

//функция удаления попапа крестиком

function popupCloseBtn(){

  popup.forEach(elem => {
    elem.querySelector('.popup__close').addEventListener('click', (e) => {
      e.target.closest('.popup').classList.remove('popup_opened');
    })
  });

}

//функция удаления попапа после сабмита

function popupCloseSub(){
  forms.forEach(elem => {
    elem.querySelector('.popup__submit').addEventListener('click', (e) => {
      e.target.closest('.popup').classList.remove('popup_opened');
  })
});  

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

function elementDelete(evt){
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
  card.querySelector('.element__photo').addEventListener('click', popupOpnFullImg);
  card.querySelector('.element__like').addEventListener('click', addLike);
  card.querySelector('.element__delete').addEventListener('click', elementDelete);

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
      title.name = 'Лихолесье';
    }

    if(!(title.link.includes('http'))){
      title.link = 'images/not-photo.jpg';
    }

  const card = createCards(title);

  elements.prepend(card);

  popupNamePlace.value = '';
  popupLink.value = '';

  popupCloseSub()

}

//функция сабмит для попапа редактирования данных профиля

function handleFormSubmitDetails(evt) {

    evt.preventDefault(); 
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
  
    popupCloseSub()
}

//вызов функции закрытия попапов

popupCloseBtn();
popupCloseSub();


//слушатели на кнопки сабмит попапов с формами

formAddPlace.addEventListener("submit", handleFormSubmitPlace);
formDetails.addEventListener("submit", handleFormSubmitDetails);

//Слушатели клика на кнопки открывающие формы

buttonNameChange.addEventListener('click', popupOpnProfileEdit);
buttonAddPlace.addEventListener('click', popupOpnAddPlace);
