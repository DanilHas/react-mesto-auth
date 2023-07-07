import { Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ children, isBurgerMenuOpen }) {
  return (
    <header className={`header ${isBurgerMenuOpen ? 'header_active' : ''}`}>
      <Link to="/">
        <img
          className="header__logo"
          src={headerLogo}
          id="logo"
          alt="Логотип 'Место'"
        />
      </Link>
      {children}
    </header>
  );
}

export default Header;
