const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // добавить стили и добавить в индекс.ссс
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
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
  //toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(inputList, buttonElement);//конечное состояние*/
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
        //hideInputError(formElement, inputElement);
    }
  };

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    //inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };

  /*
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };

  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

    
  function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add('button_inactive');
    }else{
      buttonElement.classList.remove('button_inactive');
    }
  }
  */