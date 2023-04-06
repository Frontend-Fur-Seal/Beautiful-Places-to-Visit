import Popup from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector, {handleDeleteElement}){
        super(popupSelector);
        this._handleDeleteElement = handleDeleteElement;
      }
      
      setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleDeleteElement(deleteCard(cardId));
      })}
      
}

export default PopupCardDelete