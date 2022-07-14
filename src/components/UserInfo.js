export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, pictureSelector }) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileFunction = document.querySelector(userJobSelector);
    this._picture = document.querySelector(pictureSelector);
  }

  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userOccupation: this._profileFunction.textContent,
    };
  }

  setUserInfo({ userName, userOccupation, userAvatar }) {
    this._profileName.textContent = userName;
    this._profileFunction.textContent = userOccupation;
    this._picture.src = userAvatar;
  }
}
