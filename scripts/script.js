import FormValidator from './FormValidator.js'
import Card from './Card.js'

const initialCards = [
  {
    name: 'The Gorge',
    link: 'https://res.cloudinary.com/dhh19fozh/q_auto:good,f_auto,dpr_1.0/w_auto:breakpoints_85_850_10_10:810/jb7production-uploads/2018/07/gorge-amphitheatre-crop-2018-instagram-1200x631.jpg',
  },
  {
    name: 'Red Rocks',
    link: 'https://www.mondodr.com/wp-content/uploads/2021/03/Top_Seating-NEW-ROOF-696x522.jpg',
  },
  {
    name: 'Hampton Mothership',
    link: 'http://3.bp.blogspot.com/-nH2Re_3nkdc/Ts2fDlzQvoI/AAAAAAAABpk/cHHNTQeDCZ8/s400/hampton.jpg',
  },
  {
    name: 'Big Cypress',
    link: 'https://vbwsjdqd1l-flywheel.netdna-ssl.com/wp-content/uploads/2020/02/Big-Cypress-Swamp-Florida-Trail-wading-1536x864.jpg',
  },
  {
    name: 'Angels Landing',
    link: 'https://www.americansouthwest.net/utah/photographs1118/zioncyn4.jpg',
  },
  {
    name: 'Ascend',
    link: 'http://www.hallstrategies.com/wp-content/uploads/2016/04/ascend-drawing-e1460041647625-1024x625.jpg',
  },
]

// Wrappers
const editModalWindow = document.querySelector('.modal_type_edit')
const addModalWindow = document.querySelector('.modal_type_add')
const modalEditBtn = document.querySelector('.profile__edit-btn')
const placesList = document.querySelector('.elements')
const picPreview = document.querySelector('.pic-preview')
const previewImageElement = document.querySelector('.modal__preview-image')

const editModalCloseBtn = document.querySelector('.modal__button')
const editProfileModal = document.querySelector('#modal-edit-form')
const cardName = document.querySelector('.profile__name')
const cardOccupation = document.querySelector('.profile__occupation')
const addModalBtn = document.querySelector('.profile__add-btn')
const addModalCloseBtn = document.querySelector('.button_type_add')
const addCardForm = document.querySelector('#modal-add-form')
const previewPicCloseBtn = document.querySelector('.button_type_preview')

//Inputs
const modalNameInput = document.querySelector('.modal-name-input')
const modalOccupationInput = document.querySelector('#description-input')
const addPlaceInput = document.querySelector('#place-input')
const addUrlInput = document.querySelector('#url-input')

const cardTitleInput = document.querySelector('.form__input_type_place').value

const cardLinkInput = document.querySelector('.form__input_type_image').value

//functions
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

function resetForm() {
  addCardForm.reset()
  return false
}

//Event Listeners
modalEditBtn.addEventListener('click', function () {
  modalNameInput.value = cardName.textContent
  modalOccupationInput.value = cardOccupation.textContent
  toggleModalWindow(editModalWindow)
})
editModalCloseBtn.addEventListener('click', () =>
  toggleModalWindow(editModalWindow)
)
editProfileModal.addEventListener('submit', function (e) {
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

//addModalSubmit
addCardForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const newCard = {
    name: addPlaceInput.value,
    link: addUrlInput.value,
  }
  const newCardElement = generateCard(newCard)
  renderCard(newCardElement, placesList)
  toggleModalWindow(addModalWindow)
  resetForm()
})

//Templates
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.elements__element')

//generate card funtion
/*function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true)

  cardElement.querySelector('.elements__title').textContent = card.name

  const imageEl = cardElement.querySelector('.elements__image')
  imageEl.style.backgroundImage = `url(${card.link})`
  //handlePreviewPicture
  imageEl.addEventListener('click', function () {
    previewImageElement.src = card.link
    previewImageElement.alt = card.title
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
}*/

//render card function
function renderCard(data, container) {
  console.log('render')
  const card = new Card(data, '#card-template').generateCard()
  container.prepend(card)
}

//Template setup
initialCards.forEach(function (card) {
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  }
  renderCard(newCard, placesList)
})

//validation
const editFormEl = editModalWindow.querySelector('.form')
const addFormEl = addModalWindow.querySelector('.form')

const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__error-message_visible',
  errorClass: 'form__error-message',
}

const addFormValidator = new FormValidator(formValidationConfig, addFormEl)
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(formValidationConfig, editFormEl)
editFormValidator.enableValidation()
