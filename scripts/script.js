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

// Wrappers and inputs
const editModalWindow = document.querySelector('.modal_type_edit')
const addModalWindow = document.querySelector('.modal_type_add')
const modalEditBtn = document.querySelector('.profile__edit-btn')
const placesList = document.querySelector('.elements')
const editModalCloseBtn = document.querySelector('.modal__button')
const editProfileModal = document.querySelector('#modal-edit-form')
const cardName = document.querySelector('.profile__name')
const cardOccupation = document.querySelector('.profile__occupation')
const addModalBtn = document.querySelector('.profile__add-btn')
const addModalCloseBtn = document.querySelector('.button_type_add')
const picPreviewModalCloseBtn = document.querySelector('.button_type_preview')
const addCardForm = document.querySelector('#modal-add-form')
const modalNameInput = document.querySelector('.modal-name-input')
const modalOccupationInput = document.querySelector('#description-input')
const addPlaceInput = document.querySelector('#place-input')
const addUrlInput = document.querySelector('#url-input')
const picPreview = document.querySelector('.pic-preview')
const cardTitleInput = document.querySelector('.form__input_type_place').value
const cardLinkInput = document.querySelector('.form__input_type_image').value

//functions
function openEditModal() {
  modalNameInput.value = cardName.textContent
  modalOccupationInput.value = cardOccupation.textContent
  openModal(editModalWindow)
}

function editFormSubmit(e) {
  e.preventDefault()
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
  closeModal(editModalWindow)
}

function openAddModal() {
  openModal(addModalWindow)
}

function renderCard(data, container) {
  console.log('render')
  const card = new Card(data, '#card-template').generateCard()
  container.prepend(card)
}

function addFormSubmit(e) {
  e.preventDefault()
  const newCard = {
    name: addPlaceInput.value,
    link: addUrlInput.value,
  }
  renderCard(newCard, placesList)
  e.target.reset()
  closeModal(addModalWindow)
}

export function openModal(modal) {
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
    closeModal(e.target)
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.modal_enabled')
    closeModal(openedPopup)
  }
}

//Event Listeners
modalEditBtn.addEventListener('click', openEditModal)
editModalCloseBtn.addEventListener('click', () => closeModal(editModalWindow))
editProfileModal.addEventListener('submit', editFormSubmit)
addModalBtn.addEventListener('click', openAddModal)
addModalCloseBtn.addEventListener('click', () => closeModal(addModalWindow))
picPreviewModalCloseBtn.addEventListener('click', () => closeModal(picPreview))
addCardForm.addEventListener('submit', addFormSubmit)

//Templates
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.elements__element')

//Template setup
initialCards.forEach((cardElement) => {
  renderCard(cardElement, placesList)
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
