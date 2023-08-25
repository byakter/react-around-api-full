import React, { useContext } from "react";
import edit from "../images/edit-button.svg";
import plus from "../images/Plus-vector.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onConfirmDeleteClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const userCtx = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__image"
            style={{ backgroundImage: `url(${userCtx.user.avatar})` }}
          ></div>
          <button
            className="profile__image-button"
            type="button"
            onClick={onEditAvatarClick}
          >
            <img
              src={edit}
              alt="edit-button"
              className="profile__image-button-vector"
            />
          </button>
        </div>
        <div className="profile__description">
          <div className="profile__caption">
            <h1 className="profile__title">{userCtx.user.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfileClick}
            >
              <img
                src={edit}
                alt="edit-button"
                className="profile__edit-button-vector"
              />
            </button>
          </div>
          <p className="profile__subtitle">{userCtx.user.about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          onClick={onAddPlaceClick}
        >
          <img src={plus} alt="plus-emoji" className="profile__vector" />
        </button>
      </section>

      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onConfirmDeleteClick={onConfirmDeleteClick}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
