import './Header.css';
import Icon from './Icon';
import IconBell from "./IconBell"
import IconUser from "./IconUser"
import IconFolder from "./IconFolder"
import IconHelp from "./IconHelp"

function Header() {
  return (
    <header className="header">
      <Icon IconImage={IconHelp} />
      <nav className='header__right'>
        <Icon IconImage={IconBell}/>
        <Icon IconImage={IconFolder}/>
        <Icon IconImage={IconUser}/>
      </nav>
    </header>
  );
}

export default Header;