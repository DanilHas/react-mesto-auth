import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup ${isOpen ? `popup_opened` : ''} `}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <img
          src={isSuccess ? success : fail}
          alt={
            isSuccess
              ? 'Изображение успешной аутентификации'
              : 'Изображение ошибки при аутентификации'
          }
          className="popup__auth-image"
        ></img>
        <h2 className="popup__title popup__title_place_auth">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
