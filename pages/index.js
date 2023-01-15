function checkLike(){

let elementLike = document.querySelectorAll(".element__like");
for(let elem of elementLike){
    elem.addEventListener("change", function () {
        if(elem.checked){
            elem.parentNode.classList.add("element__like-label_active");
        }else{
            elem.parentNode.classList.remove("element__like-label_active");
        }
    });
}

}


function changeName(){
  let profileName = document.querySelector(".profile__change-name");
  let profileOccupation = document.querySelector(".profile__occupation");
  let buttonNameChange = document.querySelector(".profile__button-name-change");
  let popup = document.querySelector(".popup");
  let form = document.querySelector(".popup__container");
  let popupName = form.querySelector(".popup__name");
  let popupOccupation = form.querySelector(".popup__occupation");


buttonNameChange.addEventListener("click", function(){
  popup.classList.add("popup_is-opened");
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;

})

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    popup.classList.remove("popup_is-opened");
}

function handleFormReset(){
    popup.classList.remove("popup_is-opened");
}

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("reset", handleFormReset);

}

changeName();
checkLike();