import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="wrapper">
        <div className="logo">
            <h1><Link to={'/'}>Accueil</Link></h1>
        </div>
        <div className="headerNav">
            <ul>
                <li><Link to={'/films'}>Films</Link></li>
                <li><Link to={'/admin'}>Admin</Link></li>
            </ul>
        </div>
        <div className="headerSearch">
            <input type="text" placeholder="search"/>
            <a href="#"></a>
        </div>
        <div className="notification">
            <a href="#"></a>
            <div className="number">5</div>
        </div>
    </header>
  );
}

export default Header