import './Header.css'; // optional, for specific header styles
import Icon from './Icon';

function Header() {
  return (
    <header className="header">
      <Icon />
      <nav className='header__right'>
        <Icon />
        <Icon />
        <Icon />
      </nav>
    </header>
  );
}

export default Header;