import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onConfirm,
  cards,
  userData,
  onHeaderLinkClick,
  isBurgerMenuOpen,
  onBurgerButtonClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const listItems = cards.map((card) => {
    return (
      <Card
        card={card}
        key={card._id}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onConfirm={onConfirm}
      />
    );
  });

  return (
    <>
      <Header isBurgerMenuOpen={isBurgerMenuOpen}>
        <div
          className={`header__container ${
            isBurgerMenuOpen ? 'header__container_active' : ''
          }`}
        >
          <p className="header__user-data">{userData}</p>
          <Link
            className="link link_place_main-page"
            onClick={onHeaderLinkClick}
          >
            Выйти
          </Link>
        </div>
        <button
          className={`header__burger ${
            isBurgerMenuOpen ? 'header__burger_active' : ''
          }`}
          aria-label="Открыть меню"
          aria-expanded="false"
          onClick={onBurgerButtonClick}
        >
          <span
            className={`header__burger-line ${
              isBurgerMenuOpen ? 'header__burger-line_active' : ''
            }`}
          ></span>
        </button>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-info-container">
            <button
              type="button"
              className="profile__avatar-button"
              aria-label="изменения аватара"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар пользователя"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="редактирования профиля"
                onClick={onEditProfile}
              />
              <p className="profile__about-yourself">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавления фотографии"
            onClick={onAddPlace}
          />
        </section>
        <section className="cards" aria-label="Фотографии пользователя">
          <ul className="cards__list">{listItems}</ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Main;
