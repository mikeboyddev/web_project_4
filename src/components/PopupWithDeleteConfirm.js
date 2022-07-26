import Popup from "./Popup.js";
import { loadingText } from "../utils/constants.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor(handleClick, popupSelector) {
    super(popupSelector);
    this._handleClick = handleClick;
    this._form = this._popupEl.querySelector(".form");
    this._submitButton = this._popupEl.querySelector(".form__button");
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this._card);
      this._handleClick(this._popupEl);
    });
  }

  renderLoad(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
