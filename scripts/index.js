  let profileName = document.querySelector(".profile__change-name");
  let profileOccupation = document.querySelector(".profile__occupation");
  let buttonNameChange = document.querySelector(".profile__button-name-change");
  let popup = document.querySelector(".popup");
  let form = document.querySelector(".popup__container");
  let popupName = form.querySelector(".popup__name");
  let popupOccupation = form.querySelector(".popup__occupation");


function popupOpen(){
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;

}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    handleFormReset();
}

function handleFormReset(){
    popup.classList.remove("popup_opened");
}

buttonNameChange.addEventListener("click", popupOpen);
form.addEventListener("submit", handleFormSubmit);
form.addEventListener("reset", handleFormReset);

