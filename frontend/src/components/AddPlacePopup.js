import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit }) => {
  const [placeName, setPlaceName] = useState("");
  const [buttonValue, setButtonValue] = useState("Create");
  const [link, setLink] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    setButtonValue("...Saving");
    window.setTimeout(() => {
      onAddPlaceSubmit({
        "place-name": placeName,
        link: link,
      });
    }, [500]);
  };

  useEffect(() => {
    if (isOpen === false) {
      window.setTimeout(() => {
        // after fade effect finished and tyhe popup is hidden
        setButtonValue("Create");
        setPlaceName("");
        setLink("");
      }, [500]);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place-name"
      title="New place"
      openPopup={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      handelSubmit={handelSubmit}
      buttonText={buttonValue}
    >
      <input
        className="popup__input popup__input_type_title"
        id="place-name"
        type="text"
        placeholder="Title"
        name="place-name"
        required
        minLength="1"
        maxLength="30"
        value={placeName}
        onChange={(e) => {
          setPlaceName(e.target.value);
        }}
      />
      <span id="place-name-error" className="popup__span"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="image-link"
        placeholder="Image-link"
        name="link"
        required
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <span id={"props.image-link-error"} className="popup__span"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
