import './Header.css'; // optional, for specific header styles
import Icon from './Icon';

function Header() {
  return (
    <header className="header">
      <Icon />
      <h1>Ora</h1>
      <nav className='icons-right'>
        <Icon />
        <Icon />
        <Icon />
      </nav>
    </header>
  );
}

export default Header;