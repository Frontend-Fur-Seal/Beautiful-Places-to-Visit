import Popup from "./Popup.js";

class PopupCardDelete extends Popup{
    constructor(popupSelector, {handleSubmitCardDelete}){
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector('.popup__submit');
        this._handleSubmitCardDelete = handleSubmitCardDelete;
      }

      openPopup(data){
        super.openPopup();
        this._data = data
      }

      setEventListeners(){
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          this._handleSubmitCardDelete(this._data);
      })
    }
      
}

export default PopupCardDelete