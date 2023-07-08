function InfoTooltip({ isOpen, onClose, data, isAnyPopupOpened }) {
  const { src, alt, title } = data;

  const closePopupByClickOutside = (event) => {
    if (event.target.classList.contains('popup_opened') && isAnyPopupOpened()) {
      onClose();
    }
  };

  return (
    <section
      className={`popup ${isOpen ? `popup_opened` : ''} `}
      onMouseDown={closePopupByClickOutside}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <img src={src} alt={alt} className="popup__auth-image" />
        <h2 className="popup__title popup__title_place_auth">{title}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
