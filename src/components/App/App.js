//jwt-decode
import { jwtDecode } from 'jwt-decode'

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

  //copied from class notes 16
  function jetonValide() {
    try {
      // On récupère le token du local storage
      const token = localStorage.getItem("api-film-token");
      const decoded = jwtDecode(token);
      // On vérifie si le token est toujours valide
      if (Date.now() < decoded.exp * 1000) {
        return true;
      } else {
        // Si le token est expiré, on le supprime du local storage
        localStorage.removeItem("api-film-token");
        return false;
      }
    } catch (error) {
      return false;
    }
   }

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
    try{
      const oOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginForm)
      }
  
      const res = await fetch(urlLogin, oOptions)
      const jsonRes = await res.json() //jwtDecode(jsonRes) gives {id: 1, username: '123@123.com', iat: 1711812525, exp: 1714404525}
  
      if (res.status === 200){
        //Mettre le token dans localStorage
        localStorage.setItem("api-film-token", jsonRes);
        if(jetonValide()){
          //update login 
          setLogin({isLogin: true, user: jwtDecode(jsonRes).username})
          e.target.reset()
        }else{
          setLogin({isLogin: false, user: ''})
        }
        
      }else{
        setLogin({isLogin: false, user: ''})
      }
    }catch(err){
      console.log(err)
    }
  }

  function handleLogout(){
    localStorage.removeItem("api-film-token")
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
            <Route path="films" element={<List />} />
            <Route path="film/:id" element={<Film />} />
          </Route>
          <Route path="/admin" >
            <Route index element={<Admin />} />
          </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </LoginContext.Provider>

  );
}

export default App
