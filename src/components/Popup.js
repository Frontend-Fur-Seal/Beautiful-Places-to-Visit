class Popup{
    constructor(popupSelector){
      this._popupSelector = popupSelector;
      this._closeButton = this._popupSelector.querySelector('.popup__close')
    }

    openPopup(){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown',  this._handleEscClose.bind(this));
        this.setEventListeners();
      }
      
    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
      }

    _handleEscClose(evt){
      if(evt.key === 'Escape'){
        this.closePopup();
      } 
    }
    
    setEventListeners(){
        this._closeButton.addEventListener('click', () => this.closePopup());
        this._popupSelector.addEventListener('click', (evt) => {
            if(this._popupSelector === evt.target){
              this.closePopup();
            }
          })
      }
}

export default Popup