function ImagePopup({ card, onClose, isOpen, isAnyPopupOpened }) {
  const closePopupByClickOutside = (event) => {
    if (event.target.classList.contains('popup_opened') && isAnyPopupOpened()) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_upscaling ${isOpen ? `popup_opened` : ''}`}
      aria-label="Увеличить изображение картинки"
      onMouseDown={closePopupByClickOutside}
    >
      <div className="popup__upscaling-container">
        <button
          className="popup__close-button popup__close-button_site_upscaling"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <figure className="popup__figure-container">
          <img
            className="popup__image"
            src={card ? card.link : '#'}
            alt={card ? card.name : '#'}
          />
          <figcaption className="popup__image-caption">
            {card ? card.name : ''}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
