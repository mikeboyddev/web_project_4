import '../pages/index.css'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

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
import Api from '../components/Api'

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
    'Content-Type': 'application/json',
  },
})

let section
let currentId
let popupConfirmation
let toggleLike

api
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
      userJob: user.about,
      userAvatar: user.avatar,
    })
  })
  .catch((err) => {
    console.log(err) // log the error to the console
  })

const editPopup = new PopupWithForm(
  {
    popupEl: 'modal_type_edit',
    handleFormSubmit: (inputValues) => {
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
      const addPlaceInput = inputValues.place
      const addUrlInput = inputValues.url
      renderCard({ name: addPlaceInput, link: addUrlInput }, cardsList)
    },
  },
  '.modal_type_add'
)
newCardPopup.setEventListeners()

const imagePopup = new PopupWithImage('.pic-preview')
imagePopup.setEventListeners()

//cardsList.renderItems()

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

function renderCard(data, template, callback, popupConfirmation, toggleLike) {
  const card = new Card(data, template, callback, popupConfirmation, toggleLike)
  return card.generateCard()
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
addModalBtn.addEventListener('click', openAddModal)

//validation

const addFormValidator = new FormValidator(formValidationConfig, addFormEl)
addFormValidator.enableValidation()

const editFormValidator = new FormValidator(formValidationConfig, editFormEl)
editFormValidator.enableValidation()
