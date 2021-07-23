const modalEl = document.querySelector('.modal');
const modalEditBtn = document.querySelector('.profile__edit-btn');
const modalCloseBtn = document.querySelector('.modal__button');
const modalFormEl = document.querySelector('#modal-edit-form');
const modalNameInput = document.querySelector('#modal-name-input');
const modalOccupationInput = document.querySelector('#modal-occupation-input');
const cardName = document.querySelector('.js-profile-name');
const cardOccupation = document.querySelector('.js-profile-occupation');


modalEditBtn.addEventListener('click', function() {
    modalEl.classList.add('modal_enabled');
})

modalCloseBtn.addEventListener('click', function() {
    modalEl.classList.remove('modal_enabled');
})

modalFormEl.addEventListener('submit', function(e) {
    e.preventDefault();
    cardName.textContent = modalNameInput.value;
    cardOccupation.textContent = modalOccupationInput.value;
    modalEl.classList.remove('modal_enabled');
})