class Card{
  constructor(data, templates, selectors, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._selectors = selectors;
    this._templates = templates;
    this._handleCardClick = handleCardClick;
  }

  _addLike(){
    this._element.querySelector(this._selectors.likeElement).classList.toggle('element__like_active');
  }
  _deleteElement(){
    this._element.remove();
  }


  _setEventListeners(){
    this._element.querySelector(this._selectors.photoElement).addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector(this._selectors.deleteElement).addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector(this._selectors.likeElement).addEventListener('click', () => {
      this._addLike();
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
    this._element = this._getTemplate();
    this._setEventListeners();
    const photoElement = this._element.querySelector(this._selectors.photoElement);
    const nameElement = this._element.querySelector(this._selectors.nameElement);

    nameElement.textContent = this._name;
    photoElement.src = this._link;
    photoElement.alt = this._name;

    return this._element;
  }

}

export default Card 