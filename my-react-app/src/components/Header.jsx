import './Header.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import IconBell from "./IconBell"
import IconUser from "./IconUser"
import IconFolder from "./IconFolder"

function Header() {
  return (
    <header className="header">
      <Link to="/Library">
        <Icon IconImage={IconBell} style={{ width: "23px" }}/>
      </Link>
      <nav className='header__right'>
        <Link to="/">        
          <Icon IconImage={IconFolder} style={{ width: "18px" }}/>
        </Link>
        <Link to="/User">
          <Icon IconImage={IconUser}/>
        </Link>
      </nav>
    </header>
  );
}

export default Header;