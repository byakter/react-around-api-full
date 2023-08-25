import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  card,
  onCardClick,
  onConfirmDeleteClick,
  onCardLike,
  onCardDelete,
}) => {
  const userCtx = useContext(CurrentUserContext);
  const isOwn = card.owner === userCtx.user._id;
  const cardDeleteButtonClassName = `cards__button-trash ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((userId) => userId === userCtx.user._id);
  // if (card._id === "64d3f03836ce0c001a42245d") {
  //   console.log(card, userCtx.user, isOwn);
  // }
  const cardLikeButtonClassName = `cards__button-like ${
    isLiked ? "cards__button-like_active" : ""
  }`;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onCardDelete(card);
  };

  const handleCardClick = (event) => {
    if (event && event.target === event.currentTarget) {
      onCardClick(card);
    }
  };
  const handleLikeClick = (event) => {
    onCardLike(card);
  };

  return (
    <div className="cards__card">
      <div
        className="cards__image"
        onClick={handleCardClick}
        style={{ backgroundImage: `url(${card.link})` }}
      ></div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__footer">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__container-likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
