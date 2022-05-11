const picPreview = document.querySelector('.pic-preview')
const previewImageElement = document.querySelector('.modal__preview-image')
const previewNameElement = document.querySelector('.modal__pic-name')

class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    popupConfirmation,
    toggleLike
  ) {
    this._text = data.text
    this._imageLink = data.imageLink
    this._likes = data.likes
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._popupConfirmation = popupConfirmation
    this._ownerId = data.owner
    this.id = data._id
    this._userId = data.currentId
    this._toggleLike = toggleLike
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

  _setEventListeners() {
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick({ link: this._link, title: this._name })
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
    this._heartIcon = this._element.querySelector('.elements__heart')
    this._pictureElement = this._element.querySelector('.elements__image_test')
    this._name = this._element.querySelector('.elements__title')
    this._setEventListeners()
    this._element.querySelector('.elements__title').textContent = this._text
    this._deleteIcon = this._element.querySelector('.elements__delete')
    this._pictureElement.src = this._imageLink
    this._pictureElement.alt = this._text

    return this._element
  }
}

export default Card
