const modalEl = document.querySelector('.modal')
const modalEditBtn = document.querySelector('.profile__edit-btn')
const modalCloseBtn = document.querySelector('.modal__button')
const modalFormEl = document.querySelector('#modal-edit-form')
const modalNameInput = document.querySelector('#modal-name-input')
const modalOccupationInput = document.querySelector('#modal-occupation-input')
const cardName = document.querySelector('.profile__name')
const cardOccupation = document.querySelector('.profile__occupation')

function enableModal() {
  modalEl.classList.add('modal_enabled')
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
}

function disableModal() {
  modalEl.classList.remove('modal_enabled')
}

modalEditBtn.addEventListener('click', enableModal)

modalCloseBtn.addEventListener('click', disableModal)

modalFormEl.addEventListener('submit', function (e) {
  e.preventDefault()
  cardName.textContent = modalNameInput.value
  cardOccupation.textContent = modalOccupationInput.value
  disableModal()
})
