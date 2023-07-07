import { useEffect, useState } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import useCheckValidation from '../hooks/useCheckValidation';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  const [isAuthInfoTooltipSuccess, setAuthInfoTooltipSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const [validation, handleValidation, setValid, setErrorMessage] =
    useCheckValidation();
  const { isValid } = validation;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          setAuthPopupOpen(true);
          setAuthInfoTooltipSuccess(false);
          console.error(`${err} ${err.message}`);
        });
    }
  }, [navigate]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  }, []);

  const checkIsSomePopupOpen = () => {
    const popupsState = [
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isConfirmPopupOpen,
      isImagePopupOpen,
      isAuthPopupOpen,
    ];

    return popupsState.some((state) => state === true);
  };

  const closePopupByClickOnEsc = (event) => {
    if (event.key === 'Escape' && checkIsSomePopupOpen()) {
      closeAllPopups();
    }
  };

  const closePopupByClickOutside = (event) => {
    if (
      event.target.classList.contains('popup_opened') &&
      checkIsSomePopupOpen()
    ) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closePopupByClickOnEsc);
    return () =>
      document.removeEventListener('keydown', closePopupByClickOnEsc);
  });

  useEffect(() => {
    document.addEventListener('mousedown', closePopupByClickOutside);
    return () =>
      document.removeEventListener('mousedown', closePopupByClickOutside);
  });

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
    setValid(false);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
    setValid(false);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
    setValid(false);
  };

  const handleLoading = () => {
    setLoading(true);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setImagePopupOpen(true);
  };

  const handleConfirmClick = (item) => {
    setSelectedCard(item);
    setConfirmPopupOpen(true);
    setValid(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoading(false));
  };

  const handleUpdateUser = (newUserInfo) => {
    api
      .setUserInfo(newUserInfo)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoading(false));
  };

  const handleUpdateAvatar = (newAvatar) => {
    api
      .changeAvatar(newAvatar.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoading(false));
  };

  const handleAddPlaceSubmit = (newPlace) => {
    api
      .addNewCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoading(false));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/signin', { replace: true });
    setValid(false);
    setBurgerMenuOpen(false);
  };

  const handleResetValidation = () => {
    setValid(false);
    setErrorMessage(false);
  };

  const handleBurgerButtonClick = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setAuthPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onConfirm={handleConfirmClick}
                  cards={cards}
                  userData={userEmail}
                  onHeaderLinkClick={handleSignout}
                  isLoggedIn={loggedIn}
                  isBurgerMenuOpen={isBurgerMenuOpen}
                  onBurgerButtonClick={handleBurgerButtonClick}
                />
              }
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              setAuthPopupOpen={setAuthPopupOpen}
              setAuthInfoTooltipSuccess={setAuthInfoTooltipSuccess}
              onChange={handleValidation}
              validation={validation}
              isLoading={isLoading}
              onLoading={handleLoading}
              setLoading={setLoading}
              resetValidation={handleResetValidation}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              handleLogin={handleLogin}
              setAuthPopupOpen={setAuthPopupOpen}
              setAuthInfoTooltipSuccess={setAuthInfoTooltipSuccess}
              onChange={handleValidation}
              validation={validation}
              isLoading={isLoading}
              onLoading={handleLoading}
              setLoading={setLoading}
              resetValidation={handleResetValidation}
            />
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLoading={handleLoading}
        isLoading={isLoading}
        handleValidation={handleValidation}
        validation={validation}
        setErrorMessage={setErrorMessage}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onLoading={handleLoading}
        isLoading={isLoading}
        handleValidation={handleValidation}
        validation={validation}
        setErrorMessage={setErrorMessage}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLoading={handleLoading}
        isLoading={isLoading}
        handleValidation={handleValidation}
        validation={validation}
        setErrorMessage={setErrorMessage}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onCardDelete={handleCardDelete}
        onLoading={handleLoading}
        isLoading={isLoading}
        isValid={isValid}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <InfoTooltip
        isOpen={isAuthPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isAuthInfoTooltipSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
