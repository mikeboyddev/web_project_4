const picPreview = document.querySelector('.pic-preview')
const previewImageElement = document.querySelector('.modal__preview-image')
const previewNameElement = document.querySelector('.modal__pic-name')

function openModal(modal) {
  modal.classList.add('modal_enabled')
  document.addEventListener('keydown', closeByEscape)
  modal.addEventListener('click', handleOutsideClick)
}

function closeModal(modal) {
  modal.classList.remove('modal_enabled')
  document.removeEventListener('keydown', closeByEscape)
  modal.removeEventListener('click', handleOutsideClick)
}

function handleOutsideClick(e) {
  if (e.target.classList.contains('modal')) {
    const openedPopup = document.querySelector('.modal_enabled')
    closeModal(openedPopup)
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.modal_enabled')
    closeModal(openedPopup)
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
    previewImageElement.src = this._link
    previewImageElement.alt = this._name
    previewNameElement.textContent = this._name
    openModal(picPreview)
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
      .addEventListener('click', (e) => {
        e.preventDefault()
        this._handleDelete()
        e.stopPropagation()
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