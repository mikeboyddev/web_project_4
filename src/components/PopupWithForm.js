import Popup from "./Popup.js";
import {loadingText} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupEl.querySelector(".form");
    this._submitButton = this._popupEl.querySelector('.form__button');
        this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._popupEl.querySelectorAll(".form__input");
    const inputValues = {};
    inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      
    });
  }

  renderLoad(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
