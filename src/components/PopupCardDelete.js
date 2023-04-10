import Popup from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._submitCardDelete = submitCardDelete;
      }

      submitCardDelete(cardId){

      }

      setEventListeners(){
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.submitCardDelete(cardId);         
      })}
      
}

export default PopupCardDelete