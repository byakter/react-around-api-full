import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
const userDefaultValue = { name: "", about: "" };

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [buttonValue, setButtonValue] = useState("Save");

  const { user = userDefaultValue } = useContext(CurrentUserContext);

  useEffect(() => {
    if (user && user.name && user.about) {
      setName(user.name);
      setAbout(user.about);
    }
  }, [user, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setButtonValue("...Saving");
    window.setTimeout(() => {
      onUpdateUser({
        name: name,
        about: about,
      });
    }, [500]);
  }
  useEffect(() => {
    if (isOpen === false) {
      window.setTimeout(() => {
        // after fade effect finished and tyhe popup is hidden
        setButtonValue("Save");
      }, [500]);
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      openPopup={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      handelSubmit={handleSubmit}
      buttonText={buttonValue}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <span id="name-input-error" className="popup__span"></span>

      <input
        id="about-input"
        className="popup__input popup__input_type_profession"
        type="text"
        placeholder="About me"
        name="about"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={(e) => {
          setAbout(e.target.value);
        }}
      />
      <span id="about-input-error" className="popup__span"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
