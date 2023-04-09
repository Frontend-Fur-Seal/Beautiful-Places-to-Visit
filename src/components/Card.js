class Card{
  constructor(data, templates, selectors, {checkuserId}, {handleCardClick}, {handleCardDelete}, {handleCardLike}, api){
    this._api = api;
    this._checkuserId = checkuserId;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likeMassive = data.likes;
    this._selectors = selectors;
    this._templates = templates;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._element = this._getTemplate();
    this._delElement = this._element.querySelector(this._selectors.deleteElement);
    this._cardLike = this._element.querySelector(this._selectors.likeElement);
    this._photoElement = this._element.querySelector(this._selectors.photoElement);
    this._nameElement = this._element.querySelector(this._selectors.nameElement);
    this._likesQuantity = this._element.querySelector(this._selectors.likesQuantity)
  }



  _setEventsListeners(){
    this._cardLike.addEventListener('click', () => {
      this._handleCardLike(this._cardLike, this._id, this._likesQuantity);
    });
    this._delElement.addEventListener('click', () => {
      this._handleCardDelete(this._element, this._id);
    });
    this._photoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templates)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._checkuserId(this._ownerId, this._delElement, this._likeMassive, this._cardLike);
    this._setEventsListeners();
    this._likesQuantity.textContent = this._likeMassive.length;
    /*this._likeMassive.forEach(element => {
      if(element._id === this._ownerId){
        console.log(element._id, this._ownerId)
        this._cardLike.classList.add('element__like_active');
      }
    });*/
    this._nameElement.textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    return this._element;
  }

}

export default Card 