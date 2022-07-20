import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor(handleClick, popupSelector) {
    super(popupSelector);
    this._handleClick = handleClick;
    this._form = this._popupEl.querySelector(".form");
    
  }

  open(card) {
    super.open();
    this._card = card;
    console.log(this._card)
  }

  setEventListeners() {
   
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleClick(this._card);
  });
  }
}
