import '../pages/index.css'

import FormValidator from '../components/FormValidator.js'

import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import { api, createCard, handleCardClick } from '../components/Api.js'
import Api from '../components/Api.js'

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

/*export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
    'Content-Type': 'application/json',
  },
})*/

/*export const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__occupation',
  pictureSelector: '.profile__avatar',
})*/

/*api
  .initialize()
  .then((res) => {
    const [user, data] = res
    section = new Section(
      {
        items: data,
        renderer: (item) => {
          currentId = user._id
          const element = renderCard(
            {
              text: item.name,
              imageLink: item.link,
              likes: item.likes,
              owner: item.owner._id,
              _id: item._id,
              currentId,
            },
            '#card-template',
            handleCardClick,
            popupConfirmation,
            toggleLike
          )
          section.addItem(element)
        },
      },
      '.elements'
    )
    section.renderItems()

    userInfo.setUserInfo({
      userName: user.name,
      userOccupation: user.about,
      userAvatar: user.avatar,
    })
  })
  .catch((err) => {
    console.log(err) // log the error to the console
  })
  */

const editPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_edit')

editPopup.setEventListeners()
api.getCards()
api.getUser()

function handleProfileSubmit(data) {
  api.setNewUser(data)

  userForm.reset()
}

function handlePlaceSubmit(data) {
  api.addCard(data)
  addCardForm.reset()
}

const newCardPopup = new PopupWithForm(handleProfileSubmit, '.modal_type_add')

newCardPopup.setEventListeners()

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
