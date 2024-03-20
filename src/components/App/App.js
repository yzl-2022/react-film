import './App.css'

import Header from '../header/Header'
import Nav from '../nav/Nav'
import Footer from '../footer/Footer'

import Accueil from '../accueil/Accueil'
import List from '../list-film/List-film'
import Film from '../film/Film'
import Admin from '../admin/Admin'
import NotFound from '../notFound/NotFound'

//router
import { BrowserRouter, Routes, Route } from "react-router-dom"

//useContext to control login
import { createContext, useState } from 'react'
export const LoginContext = createContext() //why export here but not at the end with export.default?

function App() {

  const [login, setLogin] = useState({isLogin: false, user: ''})

  const urlLogin = 'https://film-j3by.onrender.com/api/utilisateurs/connexion'

  //==========================
  // eventListeners to be used in nav>form
  //==========================

  async function handleLogin(e){
    e.preventDefault() //e.preventDefault() for onSubmit

    //1-get inputs from the form
    const formData = new FormData(e.target)
    let loginForm = {}

    for (const [key, value] of formData.entries()){
      loginForm[key] = value
    }

    //2-verify user in API-Film
    const oOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginForm)
    }

    const res = await fetch(urlLogin, oOptions)
    const jsonRes = await res.json()

    if (jsonRes.username){ //only if connected successfully
      setLogin({isLogin: true, user: jsonRes.username})
      e.target.reset()
    }else{
      setLogin({isLogin: false, user: ''})
    }
  }

  function handleLogout(){
    if (login.isLogin) setLogin({isLogin: false, user: ''})
  }

  return (

    <LoginContext.Provider value={login}>

      <BrowserRouter >
        <Nav handleLogin={handleLogin} handleLogout={handleLogout} />
        <Header />
        <Routes>
            <Route path="/" >
              <Route index element={<Accueil />} />
              <Route path="/films" element={<List />} />
              <Route path="/film/:id" element={<Film />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </LoginContext.Provider>

  );
}

export default App
