import PopupWithForm from "./PopupWithForm";

const ConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Are you sure?"
      openPopup={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      handelSubmit={handelSubmit}
      buttonText="Yes"
    ></PopupWithForm>
  );
};

export default ConfirmDelete;
