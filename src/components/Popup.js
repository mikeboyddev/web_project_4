export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector)
    console.log(popupSelector)
  }

  open() {
    this._popupEl.classList.add('modal_enabled')
    console.log(this._popupEl)
    console.log(this._popupEl)
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
  }

  close() {
    this._popupEl.classList.remove('modal_enabled')
    document.removeEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      console.log(this._popupEl)
      this.close()
    }
  }

  setEventListeners() {
    this._popupEl.addEventlistener('click', (e) => {
      if (e.target.classList.contains('modal_enabled')) {
        this.close()
      } else {
        this.open()
      }
    })
  }
}
