const picPreview = document.querySelector('.pic-preview')
const previewImageElement = document.querySelector('.modal__preview-image')

function toggleModalWindow(modal) {
  modal.classList.toggle('modal_enabled')

  function handleEscapeKeyPress(e) {
    if (e.key === 'Escape') {
      modal.classList.remove('modal_enabled')
    }
  }

  function handleOutsideClick(e) {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('modal_enabled')
    }
  }

  if (modal.classList.contains('modal_enabled')) {
    document.addEventListener('keydown', handleEscapeKeyPress)
    document.addEventListener('click', handleOutsideClick)
  } else {
    document.removeEventListener('keydown', handleEscapeKeyPress)
    document.removeEventListener('click', handleOutsideClick)
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link

    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true)

    return cardElement
  }

  _handleLike() {
    this._element
      .querySelector('.elements__heart')
      .classList.toggle('elements__heart_active')
  }

  _handleDelete() {
    this._element.remove()
  }

  _handlePreviewPicture() {
    toggleModalWindow(picPreview)
    previewImageElement.src = this._link
    previewImageElement.alt = this._name
  }

  _setEventListeners() {
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handlePreviewPicture()
      })

    this._element
      .querySelector('.elements__heart')
      .addEventListener('click', () => {
        this._handleLike()
      })

    this._element
      .querySelector('.elements__delete')
      .addEventListener('click', () => {
        this._handleDelete()
      })
  }

  generateCard() {
    this._element = this._getTemplate()
    console.log(this._element)
    this._setEventListeners()

    this._element.querySelector('.elements__title').textContent = this._name

    this._element.querySelector(
      '.elements__image'
    ).style.backgroundImage = `url(${this._link})`

    return this._element
  }
}

export default Card
