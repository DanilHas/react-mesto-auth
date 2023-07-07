import { useState } from 'react';
import Header from './Header';
import * as auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login({
  handleLogin,
  setAuthPopupOpen,
  setAuthInfoTooltipSuccess,
  onChange,
  validation,
  isLoading,
  onLoading,
  setLoading,
  resetValidation,
}) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formValues;
  const { isInputValid, errorMessage, isValid } = validation;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoading();

    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setFormValues({
            email: '',
            password: '',
          });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setAuthPopupOpen(true);
        setAuthInfoTooltipSuccess(false);
        console.error(`${err} ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header>
        <Link className="link" to="/signup" onClick={resetValidation}>
          Регистрация
        </Link>
      </Header>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Вход</h2>
          <form
            className="form form_type_auth"
            noValidate
            onSubmit={handleSubmit}
            onChange={onChange}
          >
            <fieldset className="form__user-data form__user-data_type_auth">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="form__input form__input_type_auth"
                id="email-input"
                onChange={handleChange}
                value={email}
              />
              <span
                className={`form__input-error place-input-error ${
                  !isInputValid.email ? 'form__input-error_visible' : ''
                }`}
              >
                {errorMessage.email}
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="Пароль"
                className="form__input form__input_type_auth"
                id="password-input"
                onChange={handleChange}
                value={password}
                minLength={6}
              />
              <span
                className={`form__input-error place-input-error ${
                  !isInputValid.password ? 'form__input-error_visible' : ''
                }`}
              >
                {errorMessage.password}
              </span>
            </fieldset>
            <button
              type="submit"
              className={`form__submit-button form__submit-button_type_auth ${
                !isValid ? 'form__submit-button_disabled' : ''
              }`}
              disabled={!isValid}
              aria-label="авторизации пользователя"
            >
              <span
                className={
                  isLoading
                    ? 'form__spinner form__spinner_type_auth'
                    : 'form__spinner_hide'
                }
              ></span>
              {isLoading ? '' : 'Войти'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
