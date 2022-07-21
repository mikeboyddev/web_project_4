class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._formInputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _hasInvalidInput(inputList) {
    return this._formInputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.toggleButtonState();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
