import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popupEl.querySelector('.form')
  }

  _getInputValues() {
    const _inputList = this._popupEl.querySelectorAll('.form__input')
    const _inputValues = {}
    _inputList.forEach((input) => (_inputValues[input.name] = input.value))
    return _inputValues
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
