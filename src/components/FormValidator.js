class FormValidator{
  constructor(config, formName){
    this._config = config;
    this._formName = formName;
    this._formElement = formName.querySelector('.popup__form');
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelectors));
  }

enableValidation(){   
  this._setEventListeners(); 
};

_setEventListeners(){
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
};

resetOpnForm(){
  this._toggleButtonState();
  
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement)
  });
}

_checkInputValidity(inputElement){
  if (!inputElement.validity.valid) {
      if(!inputElement){
          inputElement.validationMessage = inputElement.setCustomValidity("Вы пропустили это поле");
      }
      this._showInputError(inputElement, inputElement.validationMessage);
  } else {
      this._hideInputError(inputElement);
  }
};
_showInputError = function(inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._config.errorInput);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._config.errorClass);
};

_hideInputError(inputElement){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._config.errorInput);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = '';
};

_hasInvalidInput(){
  return this._inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

_toggleButtonState(){
  if(this._hasInvalidInput()){
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }else{
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }
}

}

export default FormValidator