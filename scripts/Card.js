import {openPopup} from "./index.js"

  const popupFullPhoto = document.querySelector('.popup_full-img');
  const popupImage = document.querySelector('.popup__image');
  const popupFigcaption = document.querySelector('.popup__figcaption');

class Card{
  constructor(data, templates, selectors){
    this._name = data.name;
    this._link = data.link;
    this._selectors = selectors;
    this._templates = templates;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templates)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _addLike(){
    this.classList.toggle('element__like_active');
  }
  _deleteElement(evt){
    evt.target.closest('.element').remove();
  }

  _openPopupFullImg(evt){
    openPopup(popupFullPhoto);
    popupImage.src = evt.target.src;
    popupFigcaption.textContent = evt.target.getAttribute('alt');
    popupImage.alt = popupFigcaption.textContent;
  }

  generateCard() {
    this._element = this._getTemplate();
    const deleteElement = this._element.querySelector(this._selectors.deleteElement);
    const cardLike = this._element.querySelector(this._selectors.likeElement);
    const photoElement = this._element.querySelector(this._selectors.photoElement);
    const nameElement = this._element.querySelector(this._selectors.nameElement);

    nameElement.textContent = this._name;
    photoElement.src = this._link;
    photoElement.alt = this._name;

    cardLike.addEventListener('click', this._addLike);
    deleteElement.addEventListener('click', this._deleteElement);
    photoElement.addEventListener('click', this._openPopupFullImg);

    return this._element;
  }

}

export default Card 