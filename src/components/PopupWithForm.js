import Popup from "./Popup.js";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, validationRules){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._validationRules = validationRules;
        this._form = popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
      }

      _getInputValues(){
        const valueOfInput = []
        this._inputList.forEach((elem) => {
            valueOfInput.push(elem.value);
        })
        
      }

      setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);

      }

      closePopup() {
        super.closePopup();
        this._getInputValues();
        this._form.reset();
        this._validationRules.resetOpnForm();

      }
}

export default PopupWithForm