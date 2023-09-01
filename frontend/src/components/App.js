import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState, useContext } from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDelete from "./ConfirmDelete";

function App({ setCurrrentUser }) {
  const context = useContext(CurrentUserContext);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);

  const [cards, setCards] = useState([]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmDeletePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard(null);
  };

  const handelClose = (e) => {
    if (e && e.target !== e.currentTarget) {
      return;
    }

    closeAllPopups();
  };

  const handelEscape = (e) => {
    if (e.key === "Escape") {
      handelClose();
    }
  };
  

  useEffect(() => {
    api
      .getInitialCards()
      .then((items) => {
        setCards(items.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, []);

  const handleUpdateUser = (user) => {
    api
      .setUserInfo(user)
      .then((updateUser) => {
        setCurrrentUser(updateUser.data);

        closeAllPopups();
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .changeProfileImage(avatarData)
      .then((updatedUser) => {
        setCurrrentUser(updatedUser.data);

        closeAllPopups();
      })
      .catch((error) => {
        console.log("Error updating avatar:", error);
      });
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === context.user._id);
    if (!isLiked)
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard.data : currentCard
            )
          );
        })
        .catch((error) => {
          console.log("Error add like:", error);
        });
    else
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard.data : currentCard
            )
          );
        })
        .catch((error) => {
          console.log("Error delete like:", error);
        });
  }

  function handleConfirm(card) {
    setDeleteCard(card);
    handleConfirmDeleteClick();
  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== deleteCard._id)
        );
        setDeleteCard(null);
        handelClose();
      })
      .catch((error) => {
        console.log("Error delere card:", error);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .createCard(newCard)
      .then((savedCard) => {
        setCards([savedCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Error cerate card:", error);
      });
  }

  return (
    <div className="App" onKeyDown={handelEscape}>
      <div className="page">
        <div className="page__content">
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onConfirmDeleteClick={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
            onClose={handelClose}
            onCardDelete={handleConfirm}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <ImagePopup
            selectedCard={selectedCard}
            onClose={handelClose}
            handelEscape={handelEscape}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handelClose}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handelClose}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handelClose}
            onUpdateUser={handleUpdateUser}
          />

          <ConfirmDelete
            isOpen={isConfirmDeletePopupOpen}
            onClose={handelClose}
            onConfirm={handleCardDelete}
          />

          <Footer />
          <ImagePopup />
        </div>
      </div>
    </div>
  );
}

export default App;
