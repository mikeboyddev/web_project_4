const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
]

// Wrappers
const editModalWindow = document.querySelector('.modal_type_edit')
const addModalWindow = document.querySelector('.modal_type_add')
const modalEditBtn = document.querySelector('.profile__edit-btn')
const placesList = document.querySelector('.elements__list')
const picPreview = document.querySelector('.pic-preview')
const previewImageElement = document.querySelector('.modal__preview-image')

//Buttons
const editModalCloseBtn = document.querySelector('.modal__button')
const modalFormEl = document.querySelector('#modal-edit-form')
const cardName = document.querySelector('.profile__name')
const cardOccupation = document.querySelector('.profile__occupation')
const addModalBtn = document.querySelector('.profile__add-btn')
const addModalCloseBtn = document.querySelector('.button-close_type_add')
const addModalSubmit = document.querySelector('#modal-add-form')
const previewPicCloseBtn = document.querySelector('.button-close_type_preview')

//Inputs
const modalNameInput = document.querySelector('#modal-name-input')
const modalOccupationInput = document.querySelector('#modal-occupation-input')
const addPlaceInput = document.querySelector('#modal-place-input')
const addUrlInput = document.querySelector('#modal-url-input')

//functions
function toggleModalWindow(modal) {
  if (!modal.classList.contains('modal_enabled')) {
    modalNameInput.value = cardName.textContent
    modalOccupationInput.value = cardOccupation.textContent
  }
  modal.classList.toggle('modal_enabled')
}

//Event Listeners
modalEditBtn.addEventListener('click', () => toggleModalWindow(editModalWindow))
editModalCloseBtn.addEventListener('click', () =>
  toggleModalWindow(editModalWindow)
)
modalFormEl.addEventListener('submit', function (e) {
  e.preventDefault()
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
  toggleModalWindow(editModalWindow)
})

addModalBtn.addEventListener('click', () => toggleModalWindow(addModalWindow))
addModalCloseBtn.addEventListener('click', () =>
  toggleModalWindow(addModalWindow)
)
previewPicCloseBtn.addEventListener('click', () =>
  toggleModalWindow(picPreview)
)

//addModalSubmit still needs work, the values from input are not showing in the arry
addModalSubmit.addEventListener('submit', function (e) {
  e.preventDefault()
  const newCard = {
    name: addPlaceInput.value,
    link: addUrlInput.value,
  }
  const newCardElement = generateCard(newCard)
  renderCard(newCardElement, placesList)
  toggleModalWindow(addModalWindow)
  return initialCards
})

//Templates
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.elements__element')

//generate card funtion
function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true)

  cardElement.querySelector('.elements__title').textContent = card.name

  const imageEl = cardElement.querySelector('.elements__image')
  imageEl.style.backgroundImage = `url(${card.link})`
  //handlePreviewPicture
  imageEl.addEventListener('click', function () {
    previewImageElement.src = card.link
    toggleModalWindow(picPreview)
  })

  //handleLikeIcon
  const likeButton = cardElement.querySelector('.like-button')
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__heart_active')
  })
  //handleDeleteCard
  cardElement
    .querySelector('.delete-button')
    .addEventListener('click', function (evt) {
      evt.stopPropagation()

      cardElement.remove()
    })

  return cardElement
}

//render card function
function renderCard(card, container) {
  container.append(card)
}

//Template setup?
initialCards.forEach(function (card) {
  const newCard = generateCard(card)
  renderCard(newCard, placesList)
})
