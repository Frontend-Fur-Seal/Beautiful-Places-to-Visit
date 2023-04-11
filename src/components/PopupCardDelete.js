import Popup from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector('.popup__submit');
      }

      setSubmitAction(action){
        this._handleSubmitCardDelete = action;
      }

      setEventListeners(){
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          this._handleSubmitCardDelete();
      })
    }
      
}

export default PopupCardDelete