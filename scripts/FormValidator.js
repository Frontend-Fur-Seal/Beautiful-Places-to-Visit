class FormValidator{
  constructor(config, formName){
    this._config = config;
    this._formName = formName;
  }

  enableValidation(){   
    const formElement = document.querySelector(this._formName).querySelector('.popup__form');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement); 
  };

_setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelectors));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
        if(!inputElement){
            inputElement.validationMessage = inputElement.setCustomValidity("Вы пропустили это поле");
        }
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(formElement, inputElement);
    }
  };

  _showInputError = function(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.errorInput);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  
  _hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.errorInput);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  _toggleButtonState(inputList, buttonElement){
    if(this._hasInvalidInput(inputList)){
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(this._config.inactiveButtonClass);
    }else{
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
}

}

export default FormValidator