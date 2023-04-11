import Popup from "./Popup.js";

class PopupWithForm extends Popup{
    constructor(popupSelector, {handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__submit');
        this._inputList = this._form.querySelectorAll('.popup__input');
      }

      loadedtext(text){
        this._submitButton.textContent = text;
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
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
      })}
      

      closePopup() {
        super.closePopup();
        this._form.reset();
      }
}

export default PopupWithForm