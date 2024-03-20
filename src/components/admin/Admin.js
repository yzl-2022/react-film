import './Admin.css'

import { useContext } from 'react'
import { LoginContext } from '../App/App'

function Admin() {

  const login = useContext(LoginContext)

  return (
    <main className="wrapper admin">
      {login.isLogin && <h1>Bonjour {login.user}, vous êtes dans la page d'administration.</h1>}
      {!login.isLogin && <h1>Vous n'êtes pas connecté</h1>}
    </main>
  );
}

export default Admin