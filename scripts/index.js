  let profileName = document.querySelector(".profile__name");
  let profileOccupation = document.querySelector(".profile__occupation");
  let buttonNameChange = document.querySelector(".profile__button-name-change");
  let buttonAddPlace = document.querySelector(".profile__button-add-place");
  let popup = document.querySelector(".popup");
  let form = document.querySelector(".popup__form");
  let popupName = form.querySelector(".popup__content_type_name");
  let popupOccupation = form.querySelector(".popup__content_type_occupation");
  let closePopup = popup.querySelector(".popup__close");

function popupOpen(){
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;

}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    addPlace();
    handleFormReset();
}

function handleFormReset(){
    popup.classList.remove("popup_opened");
}

buttonNameChange.addEventListener("click", popupOpen);
buttonAddPlace.addEventListener("click", popupOpen);
form.addEventListener("submit", handleFormSubmit);
closePopup.addEventListener("click", handleFormReset);

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

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function(item){

const element = elementTemplate.querySelector('.element').cloneNode(true);
element.querySelector('.element__photo').src = item.link;
element.querySelector('.element__name').textContent = item.name;
elements.append(element); 

})


function addPlace(){

  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__photo').src = popupOccupation.value;
  if(!(popupOccupation.value.includes('Http'))){
    newElement.querySelector('.element__photo').src = 'images/not-photo.jpg';
  }
  newElement.querySelector('.element__name').textContent = popupName.value;
  if(!(newElement.querySelector('.element__name').textContent)){
    newElement.querySelector('.element__name').textContent = 'Лихолесье';
  }
  elements.prepend(newElement); 
    
}




