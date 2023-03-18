import Popup from "./Popup.js";

class PopupWithImage extends Popup{

  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupFigcaption = document.querySelector('.popup__figcaption');
  }

    openPopup(name, link){
      super.openPopup();

      this._popupImage.src = link;
      this._popupFigcaption.textContent = name;
      this._popupImage.alt = this._popupFigcaption.textContent;

    }

}

export default PopupWithImage