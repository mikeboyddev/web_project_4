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
const modalEl = document.querySelector('.modal')
const modalEditBtn = document.querySelector('.profile__edit-btn')
const placesList = document.querySelector('.elements__list')

//Buttons
const modalCloseBtn = document.querySelector('.modal__button')
const modalFormEl = document.querySelector('#modal-edit-form')
const cardName = document.querySelector('.profile__name')
const cardOccupation = document.querySelector('.profile__occupation')

//Inputs
const modalNameInput = document.querySelector('#modal-name-input')
const modalOccupationInput = document.querySelector('#modal-occupation-input')

function enableModal() {
  modalEl.classList.add('modal_enabled')
  modalNameInput.value = cardName.textContent
  modalOccupationInput.value = cardOccupation.textContent
}

function disableModal() {
  modalEl.classList.remove('modal_enabled')
}

//Event Listeners
modalEditBtn.addEventListener('click', enableModal)
modalCloseBtn.addEventListener('click', disableModal)
modalFormEl.addEventListener('submit', function (e) {
  e.preventDefault()
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
  disableModal()
})

//Templates\
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.elements__element')

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true)
  cardElement.querySelector('.elements__title').textContent = card.name
  cardElement.querySelector(
    '.elements__image'
  ).style.backgroundImage = `url(${card.link})`
  return cardElement
}

function renderCard(card) {
  placesList.append(card)
}

//Template setup?
initialCards.forEach(function (card) {
  const newCard = generateCard(card)
  renderCard(newCard)
})
