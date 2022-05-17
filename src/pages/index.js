import '../pages/index.css'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import { api, createCard, handleCardClick } from '../components/Api.js'
<<<<<<< HEAD

=======
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca

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
<<<<<<< HEAD
import PopupWithDeleteConfirm from '../components/PopupWithDeleteConfirm'
=======
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca

const editPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_edit')

editPopup.setEventListeners()
api.getCards()
api.getUser()

function handleProfileSubmit(data) {
<<<<<<< HEAD
  console.log(data)
  api.setNewUser({userName:data.name, userOccupation:data.about})
=======
  api.setNewUser(data)
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca
  userForm.reset()
  editPopup.close()
}

function handlePlaceSubmit(data) {
  console.log(data)
  api.addCard(data)
  addCardForm.reset()
  newCardPopup.close()
}

<<<<<<< HEAD
const newCardPopup = new PopupWithForm(handlePlaceSubmit, '.modal_type_add')
=======
//const newCardPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_add')
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca

//newCardPopup.setEventListeners()

function toggleLike(card) {
  api.toggleLike(card.id, card.isLiked()).then((result) => {
      card.setLikes(result);
      })
      .catch((err) => {
        console.log(err);
      });
}


//cardsList.renderItems()

function openEditModal() {
  editPopup.open()
}

function openAddModal() {
  newCardPopup.open()
}

function renderCard(data, template, callback, popupWithDeleteConfirm, toggleLike) {
  const card = new Card(data, template, callback, popupWithDeleteConfirm, toggleLike)
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