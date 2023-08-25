const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.openPopup}`}
      onClick={props.onClose}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title"> {props.title}</h3>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.handelSubmit}
        >
          {props.children}

          <button type="submit" className="popup__submit-button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
