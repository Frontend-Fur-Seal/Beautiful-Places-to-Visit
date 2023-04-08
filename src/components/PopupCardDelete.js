import Popup from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector, {submitCardDelete}){
        super(popupSelector);
        this._submitCardDelete = submitCardDelete;
      }

      setEventListeners(){
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitCardDelete( getCardDetails(elementId));         
      })}
      
}

export default PopupCardDelete