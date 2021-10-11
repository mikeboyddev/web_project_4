const hideInputError = (input, formEl, settings) => {
  const errorSpan = formEl.querySelector('#' + input.id + '-error')
  errorSpan.textContent = ''
  errorSpan.classList.remove(settings.errorClass)
  input.classList.remove(settings.inputErrorClass)
}

const showInputError = (input, formEl, settings) => {
  const errorSpan = formEl.querySelector('#' + input.id + '-error')
  errorSpan.textContent = input.validationMessage
  errorSpan.classList.add(settings.errorClass)
  input.classList.add(settings.inputErrorClass)
}

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, settings)
  } else {
    showInputError(input, formEl, settings)
  }
}

const checkInputValues = (inputList) => {
  return inputList.every((input) => input.validity.valid === true)
}

const toggleButton = (inputList, button, settings) => {
  if (checkInputValues(inputList)) {
    button.disabled = false
    button.classList.remove(settings.inactiveButtonClass)
  } else {
    button.disabled = true
    button.classList.add(settings.inactiveButtonClass)
  }
}

const setEventListeners = (formEl, settings) => {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)]
  const submitButton = formEl.querySelector(settings.submitButtonSelector)
  inputList.forEach((input) => {
    input.addEventListener('input', (e) => {
      checkInputValidity(formEl, input, settings)

      toggleButton(inputList, submitButton, settings)
    })
  })
}

const enableValidation = (settings) => {
  const formElements = document.querySelectorAll(settings.formSelector)
  formElements.forEach((formEl) => {
    formEl.addEventListener('submit', (e) => e.preventDefault())
    setEventListeners(formEl, settings)
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__error-message_visible',
  errorClass: 'form__error-message',
})
