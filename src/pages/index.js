import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { api } from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import {
  pictureForm,
  editProfilePictureButton,
  modalEditBtn,
  addModalBtn,
  formValidationConfig,
  editFormEl,
  addFormEl,
} from "../utils/constants.js";
import PopupWithDeleteConfirm from "../components/PopupWithDeleteConfirm";

//set button event listeners
modalEditBtn.addEventListener("click", openEditModal);
addModalBtn.addEventListener("click", openAddModal);

//instantiate pop up with form class for adding place
const newCardPopup = new PopupWithForm(handlePlaceSubmit, ".modal_type_add");
newCardPopup.setEventListeners();

//declare vars needed later
let section;
let currentId;
//instantiate popup with form class for profile
const editPopup = new PopupWithForm(handleProfileSubmit, ".modal_type_edit");
editPopup.setEventListeners();
//instantiate and export userInfo
export const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__occupation",
  pictureSelector: ".profile__image",
});

//initialize user and cards
api
  .initialize()
  .then((res) => {
    const [user, data] = res;
    section = new Section(
      {
        items: data,
        renderer: (item) => {
          const currentId = user._id;
          const element = createCard(
            {
              text: item.name,
              imageLink: item.link,
              likes: item.likes,
              owner: item.owner._id,
              _id: item._id,
              currentId,
            },
            "#card-template",
            handleCardClick,
            popupWithDeleteConfirm,
            toggleLike
          );
          section.addItem(element);
        },
      },
      ".elements"
    );
    section.renderItems();

    userInfo.setUserInfo({
      userName: user.name,
      userOccupation: user.about,
      userAvatar: user.avatar,
    });
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

// handle profile submit function
function handleProfileSubmit(data) {
  console.log(data);
  api
    .setNewUser({ userName: data.name, userOccupation: data.about })
    .then((data) => {
      userInfo.setUserInfo({
        userName: data.name,
        userOccupation: data.about,
        userAvatar: data.avatar,
      });
      editPopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {});
}

//handle place submit function
function handlePlaceSubmit(data) {
  console.log(data);
  api
    .addCard({ title: data.place, link: data.url })
    .then((result) => {
      console.log(result);
      const elementPlace = createCard(
        {
          text: result.name,
          imageLink: result.link,
          likes: result.likes,
          owner: currentId,
          _id: result._id,
          currentId,
        },
        "#card-template",
        handleCardClick,
        popupWithDeleteConfirm,
        toggleLike
      );
      console.log(elementPlace);
      section.addItem(elementPlace);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {});
}
//instantiate profile picture class
const popupProfilePicture = new PopupWithForm(
  handlePictureSubmit,
  ".modal__profile-image-popup"
);
popupProfilePicture.setEventListeners();
//handle submitting of profile picture
function handlePictureSubmit(data) {
  api
    .changePicture(data)
    .then((result) => {
      console.log(result);
      userInfo.setUserInfo({
        userName: result.name,
        userOccupation: result.about,
        userAvatar: result.avatar,
      });
      popupProfilePicture.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {});
}

// set up event listeners for edit picture button
editProfilePictureButton.addEventListener("click", openProfilePicture);

//toggle like function
function toggleLike(card) {
  console.log(card);
  api
    .toggleLike(card._id, card.isLiked())
    .then((result) => {
      card.setLikes(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

//instantitiate delete confirm popup
const popupWithDeleteConfirm = new PopupWithDeleteConfirm(
  ".modal__confirm",
  handleDeleteClick
);
popupWithDeleteConfirm.setEventListeners();

export function createCard(
  data,
  template,
  callback,
  popupWithDeleteConfirm,
  toggleLike
) {
  const card = new Card(
    data,
    template,
    callback,
    popupWithDeleteConfirm,
    toggleLike
  );

  return card.generateCard();
}

export function handleCardClick(data) {
  imagePopup.open(data);
}

//function to open user info edit
function openEditModal() {
  editPopup.open();
}

//function to open add modal for new place
function openAddModal() {
  newCardPopup.open();
}

function handleDeleteClick(card) {
  card.handleDelete();
}

const imagePopup = new PopupWithImage(".pic-preview");
imagePopup.setEventListeners();

function addFormSubmit(e) {
  e.preventDefault();
  newCardPopup._handleFormSubmit();
  newCardPopup.close();
}



//validation

const addFormValidator = new FormValidator(formValidationConfig, addFormEl);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formValidationConfig, editFormEl);
editFormValidator.enableValidation();

const pictureValidator = new FormValidator(formValidationConfig, pictureForm);

pictureValidator.enableValidation();

//open profile pic popup
function openProfilePicture() {
  popupProfilePicture.open();
}
