import headerLogo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#logo">
        <img
          className="header__logo"
          src={headerLogo}
          id="logo"
          alt="Логотип 'Место'"
        />
      </a>
    </header>
  );
}

export default Header;
