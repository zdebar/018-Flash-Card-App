import './Header.css';
import Icon from './Icon';
import IconBell from "./IconBell"
import IconUser from "./IconUser"
import IconFolder from "./IconFolder"

function Header() {
  return (
    <header className="header">
      <Icon IconImage={IconBell} style={{ width: "23px" }}/>
      <nav className='header__right'>
        <Icon IconImage={IconFolder} style={{ width: "18px" }}/>
        <Icon IconImage={IconUser}/>
      </nav>
    </header>
  );
}

export default Header;