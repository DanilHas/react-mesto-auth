function PopupWithForm({
  name,
  title,
  submitButtonTitle,
  submitButtonDescription,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading,
  onChange,
  isValid,
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
        <form
          className="form"
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
          onChange={onChange}
        >
          {children}
          <button
            type="submit"
            className={`form__submit-button ${
              !isValid ? 'form__submit-button_disabled' : ''
            }`}
            disabled={!isValid}
            aria-label={submitButtonDescription}
          >
            <span
              className={isLoading ? 'form__spinner' : 'form__spinner_hide'}
            ></span>
            {isLoading ? '' : submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
