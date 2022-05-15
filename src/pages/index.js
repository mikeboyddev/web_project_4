import '../pages/index.css'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import { api, createCard, handleCardClick } from '../components/Api.js'

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
  userForm,
} from '../utils/constants.js'

const editPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_edit')

editPopup.setEventListeners()
api.getCards()
api.getUser()

function handleProfileSubmit(data) {
  console.log(data)
  api.setNewUser({userName:data.name, userOccupation:data.about})
  userForm.reset()
  editPopup.close()
}

function handlePlaceSubmit(data) {
  api.addCard(data)
  addCardForm.reset()
}

//const newCardPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_add')

//newCardPopup.setEventListeners()

const imagePopup = new PopupWithImage('.pic-preview')
imagePopup.setEventListeners()

//cardsList.renderItems()

function openEditModal() {
  editPopup.open()
}

function openAddModal() {
  newCardPopup.open()
}

function renderCard(data, template, callback, popupConfirmation, toggleLike) {
  const card = new Card(data, template, callback, popupConfirmation, toggleLike)
  return card.generateCard()
}

function addFormSubmit(e) {
  e.preventDefault()
  newCardPopup._handleFormSubmit()
  newCardPopup.close()
}

//Event Listeners
modalEditBtn.addEventListener('click', openEditModal)
addModalBtn.addEventListener('click', openAddModal)

//validation

const addFormValidator = new FormValidator(formValidationConfig, addFormEl)
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(formValidationConfig, editFormEl)
editFormValidator.enableValidation()