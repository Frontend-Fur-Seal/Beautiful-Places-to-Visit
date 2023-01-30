  let profileName = document.querySelector(".profile__name");
  let profileOccupation = document.querySelector(".profile__occupation");
  let buttonNameChange = document.querySelector(".profile__button-name-change");
  let buttonAddPlace = document.querySelector(".profile__button-add-place");

  let popupChangeName = document.querySelector('.popup_name-change');
  let popupAddPlace = document.querySelector('.popup_add-place');
  let form = document.querySelector(".popup__form");
  let popupName = form.querySelector(".popup__content_type_name");
  let popupOccupation = form.querySelector(".popup__content_type_occupation");
  
  let popup = document.querySelectorAll('.popup');

  let popupNamePlace = form.querySelector(".popup__content_type_name-place");
  let popupLink = form.querySelector('.popup__content_type_link');
  let popupFullPhoto = document.querySelector('.popup_full-img');

  let closePopup = document.querySelectorAll(".popup__close");

  let elementPhoto = document.querySelector('.element__photo');
  
function popupOpen(popupType){
  popupType.classList.add('popup_opened');
  
  if(popupType.className.includes('name-change')){
    popupName.value = profileName.textContent;
    popupOccupation.value = profileOccupation.textContent;
  }
}

function popupClose(){
  this.classList.remove('popup_opened');
}

for(elem of popup){
  elem.addEventListener('click', popupClose);
}
buttonNameChange.addEventListener('click', () => popupOpen(popupChangeName));
buttonAddPlace.addEventListener('click', () => popupOpen(popupAddPlace));
elementPhoto.addEventListener('click', () => popupOpen(popupFullPhoto));


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


const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const elements = document.querySelector('.elements');

function templateCard(){
    const cards = initialCards.map(function(item){
    const card = elementTemplate.cloneNode(true);
    const elementLike = document.querySelector(".element__like");
    const elementDelete = document.querySelector('.element__delete');
    card.querySelector('.element__name').textContent = item.name;
    card.querySelector('.element__photo').src = item.link;
    
    return card
 
  })

  elements.append(...cards);
}

templateCard();

elementPhoto.addEventListener('click', () => popupOpen(popupFullPhoto));
/*
function makePlace(name, link){


  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__photo').src = link;
  console.log(elementDelete);
  return element
}

for(i = 0; i < initialCards.length; i++){
  const cardItems = makePlace(initialCards[i].name, initialCards[i].link);
  elements.prepend(cardItems);
}
/*

function addPlace(){

  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__photo').src = popupOccupation.value;
  if(!(popupOccupation.value.includes('http'))){
    newElement.querySelector('.element__photo').src = 'images/not-photo.jpg';
  }
  newElement.querySelector('.element__name').textContent = popupName.value;
  if(!(newElement.querySelector('.element__name').textContent)){
    newElement.querySelector('.element__name').textContent = 'Лихолесье';
  }
  elements.prepend(newElement); 
    
}

/*

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function(item){

const element = elementTemplate.querySelector('.element').cloneNode(true);
element.querySelector('.element__photo').src = item.link;
element.querySelector('.element__name').textContent = item.name;
elements.append(element); 

})

*/



