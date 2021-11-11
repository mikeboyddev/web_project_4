import './pages/index.css'
import FormValidator from './components/FormValidator.js'
import Card from './components/Card.js'
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js'
import PopupWithImage from './components/PopupWithImage.js'
import initialCards from './utils/initialCards.js'
import {
  addModalWindow,
  modalEditBtn,
  editProfileModal,
  cardName,
  cardOccupation,
  addModalBtn,
  addCardForm,
  modalNameInput,
  modalOccupationInput,
  formValidationConfig,
  editFormEl,
  addFormEl,
} from './utils/constants.js'

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick)
      const cardElement = card.generateCard()
      cardsList.setItem(cardElement)
    },
  },
  '.elements'
)

const editPopup = new PopupWithForm(
  {
    popupEl: 'modal_type_edit',
    handleFormSubmit: (e) => {
      e.preventDefault()
      cardName.textContent = modalNameInput.value
      cardOccupation.textContent = modalOccupationInput.value
    },
  },
  '.modal_type_edit'
)

const newCardPopup = new PopupWithForm(
  {
    popupEl: 'modal_type_add',
    handleFormSubmit: (e) => {
      e.preventDefault()
      const addPlaceInput = addModalWindow.querySelector(
        '.form__input_type_place'
      )
      const addUrlInput = addModalWindow.querySelector(
        '.form__input_type_image'
      )
      renderCard(
        { name: addPlaceInput.value, link: addUrlInput.value },
        cardsList
      )
    },
  },
  '.modal_type_add'
)

const imagePopup = new PopupWithImage('.pic-preview')

cardsList.renderItems()

function openEditModal() {
  editPopup.open()
  editPopup.setEventListeners()
}

function editFormSubmit(e) {
  e.preventDefault()
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
  editPopup.close()
}

function openAddModal() {
  newCardPopup.open()
  newCardPopup.setEventListeners()
}

function renderCard(data, container) {
  console.log('render')
  const card = new Card(data, '#card-template', handleCardClick).generateCard()
  container.setItem(card)
}

function addFormSubmit(e) {
  e.preventDefault()
  newCardPopup._handleFormSubmit(e)
  newCardPopup.close()
}

function handleCardClick(data) {
  imagePopup.open(data)
}

//Event Listeners
modalEditBtn.addEventListener('click', openEditModal)
editProfileModal.addEventListener('submit', editFormSubmit)
addModalBtn.addEventListener('click', openAddModal)
addCardForm.addEventListener('submit', addFormSubmit)

//validation

const addFormValidator = new FormValidator(formValidationConfig, addFormEl)
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(formValidationConfig, editFormEl)
editFormValidator.enableValidation()
