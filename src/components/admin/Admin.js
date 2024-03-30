import './Admin.css'

import { useContext, useEffect, useState} from 'react'
import { LoginContext } from '../App/App'

function Admin() {
  //get list of all films
  const urlFilms = 'https://film-j3by.onrender.com/api/films'
  const [ listFilm, setListFilm] = useState([])
  useEffect(()=>{
    async function getListFilm(){
        const filmsRes = await fetch(urlFilms)
        const films = await filmsRes.json()
        setListFilm(films)
    }
    getListFilm()
  },[])

  const login = useContext(LoginContext)

  //==========================
  // eventListeners
  //==========================

  async function handleSubmit(e){
    e.preventDefault() //e.preventDefault() for onSubmit

    //1-get inputs from the form
    const formData = new FormData(e.target)
    let filmForm = {}

    for (const [key, value] of formData.entries()){
      if (key == 'genres'){
        filmForm[key] = formData.getAll('genres')
      }else{
        filmForm[key] = value
      }
    }

    //form should have {titre: '',genres: [],description: '',annee: '',realisation: '',titreVignette: ''}
    if (filmForm.titre && filmForm.genres && (filmForm.genres.length > 0) && filmForm.description && filmForm.annee && filmForm.realisation && filmForm.titreVignette){
      try{
        //2-update database
        const oOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("api-film")}`,
          },
          body: JSON.stringify(filmForm)
        }
  
        const res = await fetch(urlFilms, oOptions)
        const jsonRes = await res.json()
  
        console.log(res.status, jsonRes);
  
        if(res.status === 200){
          e.target.reset()
          //3-get the new film list 
          const newFilmsRes = await fetch(urlFilms)
          const newFilms = await newFilmsRes.json()
          setListFilm(newFilms)
        }else{
          console.log("erreur dans ajouter film: ", jsonRes.message)
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  async function handleDelete(id){
    try{
      //1-update database
      const oOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("api-film")}`,
        },
      }

      const res = await fetch(urlFilms.concat('/',id), oOptions)
      const jsonRes = await res.json()

      console.log(res.status, jsonRes);

      //2-get the new film list 
      const newFilmsRes = await fetch(urlFilms)
      const newFilms = await newFilmsRes.json()
      setListFilm(newFilms)

    }catch(err){
      console.log(err)
    }
  }

  return (
    <main className="wrapper admin">
      {!login.isLogin && <h1>Vous n'êtes pas connecté</h1>}
      {true && (
        <article>
          <section>
            <form className='one' onChange={handleChange} onSubmit={handleSubmit}>
              <h2>Ajouter un nouveau film</h2>
              <label htmlFor="titre">Titre: <input name="titre" id="titre" type="text" placeholder="titre du film" required/></label>
              <label htmlFor="genres">Genres: 
                <select name="genres" id="genres" multiple required>
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
              <label htmlFor="description">Description: <textarea name="description" id="description" cols="30" rows="10" placeholder='entrez la description du film' defaultValue="description du film ..." required></textarea></label>
              <label htmlFor="annee">Année (min: 1888): <input type="number" name="annee" id="annee" min='1888' max='2024' required/></label>
              <label htmlFor="realisation">Réalisation: <input type="text" name="realisation" id="realisation" required/></label>
              <label htmlFor="titreVignette">TitreVignette: <input type="text" name="titreVignette" id="titreVignette" required defaultValue="vide.jpg"/></label>
              <input className='btn' type="submit" value="Ajouer un nouveau film"/>
            </form>
          </section>
          <section>
            <h2>Liste de films</h2>
            <ul>
              {listFilm.map( film => <li key={film.id}>{film.titre} <button onClick={()=>handleDelete(film.id)}>Supprimer</button></li>)}
            </ul>
          </section>
        </article>
      )}
    </main>
  );
}

export default Admin