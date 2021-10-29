class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formElement = formElement
  }

  _showInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`)
    input.classList.add(this._inputErrorClass)
    errorSpan.textContent = input.validationMessage
    errorSpan.classList.add(this._errorClass)
  }

  _hideInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`)
    input.classList.remove(this._inputErrorClass)
    errorSpan.classList.remove(this._errorClass)
    errorSpan.textContent = ''
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input)
    } else {
      this._showInputError(input)
    }
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.disabled = false
      button.classList.remove(this._inactiveButtonClass)
    } else {
      button.disabled = true
      button.classList.add(this._inactiveButtonClass)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.every((input) => input.validity.valid === true)
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )

    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    )
    inputList.forEach((input) => {
      input.addEventListener('input', (e) => {
        this._checkInputValidity(input)
        this._toggleButtonState(inputList, submitButton)
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._setEventListeners()
  }
}

export default FormValidator