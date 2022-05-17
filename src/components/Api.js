import Card from '../components/Card.js'
import Section from '../components/Section.js'
import { profilePicture, userName, userOccupation } from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDeleteConfirm from '../components/PopupWithDeleteConfirm.js'


function handleDeleteClick(card) {
  
  card.handleDelete();
}


const imagePopup = new PopupWithImage('.pic-preview')
imagePopup.setEventListeners()



const popupWithDeleteConfirm = new PopupWithDeleteConfirm(".modal__confirm", handleDeleteClick);
popupWithDeleteConfirm.setEventListeners();




export const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__occupation',
  /* pictureSelector: '.profile__picture', */
})

export function createCard(data, template, callback, popupWithDeleteConfirm, toggleLike) {
  const card = new Card(data, template, callback, popupWithDeleteConfirm, toggleLike)
  
  return card.generateCard()
}

export function handleCardClick(data) {
  imagePopup.open(data)
}

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  }

  initialize() {
    return Promise.all([this.getInitialUser(), this.getCards()])
  }

  getCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        const section = new Section(
          {
            items: result,
            renderer: (item) => {
              const element = createCard(
                { text: item.name, imageLink: item.link , likes: item.likes.length},
                '#card-template',
                handleCardClick, popupWithDeleteConfirm
              )
              section.addItem(element)
            },
          },
          '.elements'
        )
        this._section = section

        this._section.renderItems()
      })
  }

  getUser() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        userName.textContent = result.name
        userOccupation.textContent = result.about
      })
  }

  addCard(data) {
    fetch(`${this._baseUrl}/cards`, {
<<<<<<< HEAD
      method: "POST",
=======
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.url,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const element = createCard(
          { text: result.name, imageLink: result.link },
          '#card-template',
          handleCardClick, popupWithDeleteConfirm
        )
        this._section.addItem(element)
      })
  }

  setNewUser({ userName, userOccupation }) {
    fetch(`${this._baseUrl}/users/me`, {
<<<<<<< HEAD
      method: "PATCH",
=======
>>>>>>> 66a8f31ed3813c31529567d844aaab84abbbb1ca
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userOccupation,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
      console.log(data),
        userInfo.setUserInfo({
          userName, userOccupation
        })
      )
  }

  toggleLike(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers
    })
    .then(res => this._handleResponse(res)); 
 }
}

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
    'Content-Type': 'application/json',
  },
})
