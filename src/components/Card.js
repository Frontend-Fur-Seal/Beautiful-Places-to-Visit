class Card{
  constructor(data, templates, selectors, {handleCardClick}, api){
    this._api = api;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this.owner = data.owner;
    this._selectors = selectors;
    this._templates = templates;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._delElement = this._element.querySelector(this._selectors.deleteElement);
    this._cardLike = this._element.querySelector(this._selectors.likeElement);
    this._photoElement = this._element.querySelector(this._selectors.photoElement);
    this._nameElement = this._element.querySelector(this._selectors.nameElement);
  }

  _addLike(){
    this._cardLike.classList.toggle('element__like_active');
  }
  _deleteElement(){
    this._api.cardDelete(this._id)
    .then((result) => {
      console.log(result)
    })
    this._element.remove();
    this._element = null;
  }




  _setEventsListeners(){
    this._cardLike.addEventListener('click', () => {
      this._addLike();
    });
    this._delElement.addEventListener('click', () => {
      this._deleteElement();
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

  getCards(){
    this._api.getInitialCards()
    .then((result) => {
      result.forEach(element => {
        return element
      });
    })
  }

  checkuserId(){
    this._api.getInitialUser()
    .then((result) => {
      if(result._id != this.owner._id){
        this._delElement.style.display = 'none'
      }
    })
    
  }

  generateCard() {
    this._setEventsListeners();
    this.checkuserId();
    this._nameElement.textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
// при генерации карточки сравнивать id owner со своим id и если отличается - скрывать кнопку удаления
    return this._element;
  }

}

export default Card 