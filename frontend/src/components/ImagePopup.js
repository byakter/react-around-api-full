const ImagePopup = ({ selectedCard, onClose, handelEscape }) => {
  return (
    <div
      className={`popup  ${selectedCard ? "popup_opened" : ""}`}
      onClick={onClose}
      onKeyDown={handelEscape}
    >
      <div className="popup__content popup__content_preview">
        <button
          type="button"
          className="popup__close popup__close_type_btn"
          onClick={onClose}
        ></button>
        {selectedCard && (
          <>
            <img
              className="popup__preview-image"
              src={selectedCard.link}
              alt={selectedCard.name}
            />
            <p className="popup__preview-title">{selectedCard.name}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePopup;
