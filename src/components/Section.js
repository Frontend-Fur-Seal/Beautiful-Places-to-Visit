class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItemAppend(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
      this._container.prepend(element);
  }
      
    renderItems(items) {
      items.forEach(elem => {
        this._renderer(elem);
      });
    }

  
}

export default Section