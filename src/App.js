import headerLogo from "./images/header-logo.svg";

function App() {
  return (
    <>
      <header className="header">
        <a href="#">
          <img
            className="header__logo"
            src={headerLogo}
            alt="Логотип 'Место'"
          />
        </a>
      </header>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-info-container">
            <button
              type="button"
              className="profile__avatar-button"
              aria-label="изменения аватара"
            >
              <img className="profile__avatar" src="#" alt="" />
            </button>
            <div className="profile__info">
              <h1 className="profile__name"></h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="редактирования профиля"
              />
              <p className="profile__about-yourself"></p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавления фотографии"
          />
        </section>
        <section className="cards" aria-label="Фотографии пользователя">
          <ul className="cards__list" />
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">© 2023 Mesto Russia</p>
      </footer>
      <section className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="закрытия модального окна"
          />
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form" name="editProfileForm" noValidate="">
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
            <button
              type="submit"
              className="popup__submit-button"
              aria-label="сохранения данных пользователя"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_add-card">
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="закрытия модального окна"
          />
          <h2 className="popup__title">Новое место</h2>
          <form className="form" name="addCardForm" noValidate="">
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
            <button
              type="submit"
              className="popup__submit-button"
              aria-label="создания новой карточки"
            >
              Создать
            </button>
          </form>
        </div>
      </section>
      <section
        className="popup popup_type_upscaling"
        aria-label="Увеличить изображение картинки"
      >
        <div className="popup__upscaling-container">
          <button
            className="popup__close-button popup__close-button_site_upscaling"
            type="button"
            aria-label="закрытия модального окна"
          />
          <figure className="popup__figure-container">
            <img className="popup__image" src="#" alt="" />
            <figcaption className="popup__image-caption" />
          </figure>
        </div>
      </section>
      <section className="popup popup_type_delete-card">
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="закрытия модального окна"
          />
          <h2 className="popup__title">Вы уверены?</h2>
          <button
            type="button"
            className="popup__submit-button"
            aria-label="подтверждения действия"
          >
            Да
          </button>
        </div>
      </section>
      <section className="popup popup_type_change-avatar">
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="закрытия модального окна"
          />
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="form" name="changeAvatarForm" noValidate="">
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
            <button
              type="submit"
              className="popup__submit-button"
              aria-label="сохранения аватара"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
