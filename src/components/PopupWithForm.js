import Popup from "./Popup.js";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = popupSelector.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
      }
    
      _getInputValues(){
        this._valueOfInput = {}
        this._inputList.forEach(input => {
          this._valueOfInput[input.name] = input.value;
        })
        return this._valueOfInput
      }
  
      setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);

      }

      closePopup() {
        super.closePopup();
        this._form.reset();
      }
}

export default PopupWithForm