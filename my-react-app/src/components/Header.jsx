import { Link } from 'react-router-dom';
import Icon from './Icons/Icon';
import IconBell from "./Icons/IconBell"
import IconUser from "./Icons/IconUser"
import IconLibrary from "./Icons/IconLibrary"

export default function Header() {
  return (
    <header className="flex right p1">
      <Link to="/Library">
        <Icon IconImage={IconBell} style={{ width: "23px" }}/>
      </Link>
      <Link to="/">        
        <Icon IconImage={IconLibrary} style={{ width: "18px" }}/>
      </Link>
      <Link to="/User">
        <Icon IconImage={IconUser}/>
      </Link>
    </header>
  );
}