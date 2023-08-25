import React, { useRef, useEffect } from "react";
import successImage from "../images/UnionV.svg";
import errorImage from "../images/UnionX.svg";

const InfoTooltip = (props) => {
  const handelEscape = (e) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, []);
  return (
    <div
      className={`popup popup_opened`}
      onClick={props.onClose}
      onKeyDown={handelEscape}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close popup__close_type_btn"
          onClick={props.onClose}
          ref={btnRef}
        ></button>
        <div className="popup__auth-content">
          <img
            className="popup__auth-img"
            src={props.ok ? successImage : errorImage}
            alt="action result"
          />
          <p className="popup__message">{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
