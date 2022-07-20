
class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    popupWithDeleteConfirm,
    toggleLike,
    
  ) {
    console.log(data)
    this._text = data.text;
    this._imageLink = data.imageLink;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._popupWithDeleteConfirm = popupWithDeleteConfirm;
    this._ownerId = data.owner;
    this._id = data._id;
    this._userId = data.userId;
    this._toggleLike = toggleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  setLikes(likes) { 
    // set instance variable
    
     this._likes = likes;
     this._renderLikes()
     
     
 } 

  _renderLikes() {
    this._likeSelector.textContent = this._likes.length;
    if (this.isLiked()) {
      
      this._heartIcon.classList.add('elements__heart_active');
      
   } else {
     this._heartIcon.classList.remove('elements__heart_active');
    }
    
}

  handleDelete() {
   
    this._element.remove();
        this._element = null;

    
  }

  _setEventListeners() {
    this._heartIcon.addEventListener("click", () => {
      console.log(this._toggleLike)
        this._toggleLike(this);
    });
      if(this._deleteIcon){ 
        this._deleteIcon.addEventListener("click", () => {
          
          this._popupWithDeleteConfirm.open(this);
        });
      }
      this._pictureElement.addEventListener("click", (evt) => {
        this._handleCardClick({ link: this._imageLink, text: this._text }); 
      });
}

  generateCard() {
    this._element = this._getTemplate();
    this._heartIcon = this._element.querySelector(".elements__heart");
    this._likeSelector = this._element.querySelector(".elements__likes");
    this._pictureElement = this._element.querySelector(".elements__image_test");
    this._element.setAttribute("id", this.id);
    this._name = this._element.querySelector(".elements__title");
    this._element.querySelector(".elements__title").textContent = this._text;
    this._deleteIcon = this._element.querySelector(".elements__delete");
    if(this._ownerId !== this._userId) {
      this._deleteIcon.remove();
    }
    this._pictureElement.src = this._imageLink;
    this._pictureElement.alt = this._text;
    this._renderLikes();
    this._setEventListeners();
    return this._element;
  }

  isLiked() {
    // return true if user liked the card, otherwise false
  
    return this._likes.some(item => item._id === this._userId);
    

    
    
   } 
}

export default Card;
