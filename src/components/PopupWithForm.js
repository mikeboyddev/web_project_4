import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popupEl.querySelector('.form')
    console.log(popupSelector)
  }

  _getInputValues() {
    this._inputList = this._popupEl.querySelectorAll('.form__input')
    this._inputValues = {}
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    )
    return this._inputValues
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
      this.close()
    })
    super.setEventListeners()
  }

  close() {
    this._popupForm.reset()
    super.close()
  }
}
