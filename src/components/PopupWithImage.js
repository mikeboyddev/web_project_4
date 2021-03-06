import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupEl.querySelector(".modal__preview-image");
    this._title = this._popupEl.querySelector(".modal__pic-name");
  }

  open({ link, title }) {
    this._link.src = link;
    this._link.alt = `Photo of ${title}`;
    this._title.textContent = title;
    super.open();
  }
}
