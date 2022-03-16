import '../pages/index.css'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import initialCards from '../utils/initialCards.js'
import {
  addModalWindow,
  modalEditBtn,
  editProfileModal,
  userName,
  userOccupation,
  addModalBtn,
  addCardForm,
  modalNameInput,
  modalOccupationInput,
  formValidationConfig,
  editFormEl,
  addFormEl,
} from '../utils/constants.js'

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick)
      const cardElement = card.generateCard()
      cardsList.addItem(cardElement)
    },
  },
  '.elements'
)

const editPopup = new PopupWithForm(
  {
    popupEl: 'modal_type_edit',
    handleFormSubmit: (inputValues) => {
      e.preventDefault()
      userName.textContent = inputValues.name
      userOccupation.textContent = inputValues.occupation
    },
  },
  '.modal_type_edit'
)
editPopup.setEventListeners()

const newCardPopup = new PopupWithForm(
  {
    popupEl: 'modal_type_add',
    handleFormSubmit: (inputValues) => {
      const addPlaceInput = inputValues.name
      const addUrlInput = inputValues.link
      renderCard({ name: addPlaceInput, link: addUrlInput }, cardsList)
    },
  },
  '.modal_type_add'
)
newCardPopup.setEventListeners()

const imagePopup = new PopupWithImage('.pic-preview')
imagePopup.setEventListeners()

cardsList.renderItems()

function openEditModal() {
  modalNameInput.value = userName.textContent
  modalOccupationInput.value = userOccupation.textContent
  editPopup.open()
}

function editFormSubmit(e) {
  e.preventDefault()
  userName.textContent = modalNameInput.value
  userOccupation.textContent = modalOccupationInput.value
  editPopup.close()
}

function openAddModal() {
  newCardPopup.open()
}

function renderCard(data, container) {
  console.log('render')
  const card = new Card(data, '#card-template', handleCardClick).generateCard()
  container.addItem(card)
}

function addFormSubmit(e) {
  e.preventDefault()
  newCardPopup._handleFormSubmit()
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
