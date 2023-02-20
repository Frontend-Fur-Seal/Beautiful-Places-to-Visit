
const enableValidation = function(config){   
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    console.log(formList);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement, config); 
    });
  };

  const setEventListeners = function(formElement, config){
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const checkInputValidity = function(formElement, inputElement, config){
    if (!inputElement.validity.valid) {
        if(!inputElement){
            inputElement.validationMessage = inputElement.setCustomValidity("Вы пропустили это поле");
        }
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
  };

  const showInputError = function(formElement, inputElement, errorMessage, config){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.errorInput);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  
  function hideInputError(formElement, inputElement, config){
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

  function toggleButtonState(inputList, buttonElement, config){
    if(hasInvalidInput(inputList)){
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(config.inactiveButtonClass);
    }else{
        buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
  
