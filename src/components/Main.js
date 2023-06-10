import { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  }, []);

  const listItems = cards.map((card) => {
    return (
      <Card card={card} key={card._id} onCardClick={onCardClick} />
    );
  });

  return (
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
              src={userAvatar}
              alt="Аватар пользователя"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактирования профиля"
              onClick={onEditProfile}
            />
            <p className="profile__about-yourself">{userDescription}</p>
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
  );
}
export default Main;
