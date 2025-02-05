import { Link } from 'react-router-dom';
import Icon from './Icons/Icon';
import IconBell from "./Icons/IconBell"
import IconUser from "./Icons/IconUser"
import IconLibrary from "./Icons/IconLibrary"
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <Icon IconImage={IconBell} style={{ width: "22px" }}/>
      </Link>
      <Link to="/Library">        
        <Icon IconImage={IconLibrary} style={{ width: "16px" }}/>
      </Link>
      <Link to="/User">
        <Icon IconImage={IconUser}/>
      </Link>
    </header>
  );
}