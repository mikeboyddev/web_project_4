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

  _handleLike() {}

  _handleDelete() {}

  _handlePreviewPicture() {}

  _setEventListeners() {
    //this is where we set up the events
    console.warn('this is not done')
  }

  generateCard() {
    this._element = this._getTemplate()
    console.log(this._element)
    this._setEventListeners()
    this._element.querySelector('.elements__title').textContent = this._name

    this._element.querySelector(
      '.elements__image'
    ).style.backgroundImage = `url(${this._link})`
  }
}

export default Card
