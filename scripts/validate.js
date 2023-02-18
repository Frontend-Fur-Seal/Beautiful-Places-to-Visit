const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive', 
    errorInput: 'popup__input_error',
    errorClass: 'popup__message-error_active'
  }; 

function enableValidation(){   
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement); 
    });
  };

  function setEventListeners(formElement){
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
        if(!inputElement){
            inputElement.validationMessage = inputElement.setCustomValidity("Вы пропустили это поле");
        }
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
  };

  function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.errorInput);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  
  function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.errorInput);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(config.inactiveButtonClass);
    }else{
        buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
  
  enableValidation();