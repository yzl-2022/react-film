import './Nav.css'

import { useContext } from 'react'
import { LoginContext } from '../App/App'

function Nav(props) {

  const login = useContext(LoginContext)

  return (
    <nav className="wrapper">
        <ul>
            {!login.isLogin && (<li>
                                  <form onSubmit={props.handleLogin}>
                                    <input type="email" name='username' placeholder='email' defaultValue="123@123.com" />
                                    <input type="password" name='password' placeholder='mot de passe' defaultValue="123456789" />
                                    <input className='nav-btn' type="submit" value="CONNEXION" />
                                  </form>
                                </li>)
            }
            {login.isLogin && <li>Bonjour, {login.user} <button className='nav-btn' onClick={props.handleLogout}>DÉCONNEXION</button></li>}
            <li><a href="#"><img src="icons/language.svg" alt="language"/><span className="active">FR</span></a></li>
        </ul>
    </nav>
  );
}

export default Nav