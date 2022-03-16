export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector
    this._jobSelector = jobSelector
  }

  getUserInfo() {
    return {
      cardName: this._nameSelector.textContent,
      cardOccupation: this._jobSelector.textContent,
    }
  }

  setUserInfo(nameSelector, jobSelector) {
    this._nameSelector.textContent = nameSelector
    this._aboutSelector.textContent = jobSelector
  }
}
