import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  };

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitButtonTitle="Сохранить"
        submitButtonDescription="сохранения данных пользователя"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__user-data">
          <input
            type="text"
            name="username"
            required=""
            placeholder="Имя"
            className="form__input form__input_info_name"
            id="username-input"
            minLength={2}
            maxLength={40}
          />
          <span className="form__input-error username-input-error" />
          <input
            type="text"
            name="user-info"
            required=""
            placeholder="О себе"
            className="form__input form__input_info_job"
            id="user-info-input"
            minLength={2}
            maxLength={200}
          />
          <span className="form__input-error user-info-input-error" />
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        submitButtonTitle="Создать"
        submitButtonDescription="создания новой карточки"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__user-data">
          <input
            type="text"
            name="name"
            required=""
            placeholder="Название"
            className="form__input form__input_name_place"
            id="place-input"
            minLength={2}
            maxLength={30}
          />
          <span className="form__input-error place-input-error" />
          <input
            type="url"
            name="link"
            required=""
            placeholder="Ссылка на картинку"
            className="form__input form__input_name_image-link"
            id="image-link-input"
          />
          <span className="form__input-error image-link-input-error" />
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        submitButtonTitle="Сохранить"
        submitButtonDescription="сохранения аватара"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__user-data">
          <input
            type="url"
            name="avatar"
            required=""
            placeholder="Ссылка на картинку"
            className="form__input form__input_name_avatar-link"
            id="avatar-link-input"
          />
          <span className="form__input-error avatar-link-input-error" />
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        submitButtonTitle="Да"
        submitButtonDescription="подтверждения действия"
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
    </>
  );
}

export default App;
