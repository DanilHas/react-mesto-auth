function PopupWithForm({
  name,
  title,
  submitButtonTitle,
  submitButtonDescription,
  isOpen,
  onClose,
  children,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''} `}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={`${name}-form`} noValidate="">
          {children}
          <button
            type="submit"
            className="form__submit-button"
            aria-label={submitButtonDescription}
          >
            {submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
