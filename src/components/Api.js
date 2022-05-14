import Card from '../components/Card.js'
import Section from '../components/Section.js'
import { profilePicture, userName, userOccupation } from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js'

export const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__occupation',
  /* pictureSelector: '.profile__picture', */
})

export function createCard(data, template, callback) {
  const card = new Card(data, template, callback)
  return card.generateCard()
}

export function handleCardClick({ data }) {
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
    fetch('https://around.nomoreparties.co/v1/group-12/cards', {
      headers: {
        authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const section = new Section(
          {
            items: result,
            renderer: (item) => {
              const element = createCard(
                { text: item.name, imageLink: item.link },
                '#card-template',
                handleCardClick
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
    fetch('https://around.nomoreparties.co/v1/group-12/users/me', {
      headers: {
        authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        userName.textContent = result.name
        userOccupation.textContent = result.about
      })
  }

  addCard(data) {
    fetch('https://around.nomoreparties.co/v1/group-12/cards', {
      method: 'POST',
      headers: {
        authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const element = createCard(
          { text: result.name, imageLink: result.link },
          '#card-template',
          handleCardClick
        )
        this._section.addItem(element)
      })
  }

  setNewUser({ userName, userOccupation }) {
    fetch('https://around.nomoreparties.co/v1/group-12/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        about: userOccupation,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        userInfo.setUserInfo({
          userName: data.name,
          userOccupation: data.about,
        })
      )
  }
}

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '96b879ed-c9ef-4658-9fc3-439faa410fe1',
    'Content-Type': 'application/json',
  },
})
