export const editModalWindow = document.querySelector('.modal_type_edit')
export const addModalWindow = document.querySelector('.modal_type_add')
export const modalEditBtn = document.querySelector('.profile__edit-btn')
export const editProfileModal = document.querySelector('#modal-edit-form')
export const userName = document.querySelector('.profile__name')
export const userOccupation = document.querySelector('.profile__occupation')
export const addModalBtn = document.querySelector('.profile__add-btn')
export const addCardForm = document.querySelector('#modal-add-form')
export const modalNameInput = document.querySelector('.modal-name-input')
export const modalOccupationInput = document.querySelector('#description-input')
export const editFormEl = editModalWindow.querySelector('.form')
export const addFormEl = addModalWindow.querySelector('.form')
export const userForm = document.querySelector('#modal-edit-form')
export const profilePicture = document.querySelector('.profile__image')
export const likeSelector = document.querySelector('.elements__likes')
export const editPictureSelector = document.querySelector('.profile-image-popup')
export const editProfilePictureButton = document.querySelector('.profile__avatar')
export const pictureForm = document.querySelector('.form')
export const pictureButton = document.querySelector('.create-button')
export const placeButton = document.querySelector('.image-add')
export const profileButton = document.querySelector('.update-btn')
export const loadingText = "Saving..."


export const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__error-message_visible',
  errorClass: 'form__error-message',
}

export const formValidationConfigPicture = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__error-message_visible",
  errorClass: "form__error-message",
}