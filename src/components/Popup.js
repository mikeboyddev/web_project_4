export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector)
  }

  open() {
    this._popupEl.classList.add('modal_enabled')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupEl.classList.remove('modal_enabled')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popupEl.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal__cross')) {
        this.close()
      }
    })
    this._popupEl.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal')) {
        this.close()
      }
    })
  }
}
