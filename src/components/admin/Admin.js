import './Admin.css'

import { useContext, useEffect, useState} from 'react'
import { LoginContext } from '../App/App'

function Admin() {
  //get a list of all films
  const urlFilms = 'https://film-j3by.onrender.com/api/films'
  const [ listFilm, setListFilm] = useState([])
  useEffect(()=>{
    async function getListFilm(){
        const res = await fetch(urlFilms)
        const jsonRes = await res.json()
        setListFilm(jsonRes)
    }
    getListFilm()
  },[])

  const login = useContext(LoginContext)

  return (
    <main className="wrapper admin">
      {!login.isLogin && <h1>Vous n'êtes pas connecté</h1>}
      {login.isLogin && (
        <article>
          <section>
            <form action="/films" method="POST" className='one'>
              <h2>Ajouter un nouveau film</h2>
              <label htmlFor="titre">Titre: <input name="titre" id="titre" type="text" placeholder="titre du film" required/></label>
              <label htmlFor="genres[]">Genres: 
                <select name="genres[]" id="genres" multiple>
                  <option value="Action">Action</option>
                  <option value="Animation">Animation</option>
                  <option value="Aventure">Aventure</option>
                  <option value="Comédie">Comédie</option>
                  <option value="Crime">Crime</option>
                  <option value="Drame">Drame</option>
                  <option value="Famille">Famille</option>
                  <option value="Fantaisie">Fantaisie</option>
                  <option value="Horreur">Horreur</option>
                  <option value="Musical">Musical</option>
                  <option value="Mystère">Mystère</option>
                  <option value="Romance">Romance</option>
                  <option value="Science-fiction">Science-fiction</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </label>
              <label htmlFor="description">Description: <textarea name="description" id="description" cols="30" rows="10" placeholder='entrez la description du film'></textarea></label>
              <label htmlFor="annee">Année (min: 1888): <input type="number" name="annee" id="annee" min='1888' max='2024' required/></label>
              <label htmlFor="realisation">Réalisation: <input type="text" name="realisation" id="realisation"/></label>
              <label htmlFor="titreVignette">TitreVignette: <input type="text" name="titreVignette" id="titreVignette"/></label>
              <input className='btn' type="submit" value="Ajouer un nouveau film"/>
            </form>
          </section>
          <section>
            <h2>Liste de films</h2>
            <ul>
              {listFilm.map( film => <li key={film.id}>{film.titre} <button>Supprier</button></li>)}
            </ul>
          </section>
        </article>
      )}
    </main>
  );
}

export default Admin