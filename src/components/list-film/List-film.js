import './List-film.css'
import Card from '../card-film/Card-film'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function List() {
    const urlFilms = 'https://film-j3by.onrender.com/api/films'

    //expecting 3 parameters: /api/films?tri=annee&ordre=asc&limit=15 
    const [params] = useSearchParams()
    const tri = params.get('tri') || 'id'
    const ordre = params.get('ordre') || 'asc'
    const limit = params.get('limit') || '20'
    //console.log('tri = ',tri, ' ordre = ', ordre, ' limit = ', limit)

    const [urlTri, setUrlTri] = useState(tri)
    const [urlOrdre, setUrlOrdre] = useState(ordre)
    const [urlLimit, setUrlLimit] = useState(limit)

    const handleFilter = (e) => {  // this is a onChange listener, so do not need e.preventDefault()
        const filterData ={}
        const formElements = e.currentTarget.elements

        for (const element of formElements) {
            if(element.type === 'radio' && element.checked){
                filterData[element.name] = element.value
            }else if(element.type === 'number') {
                filterData[element.name] = element.value
            }
        }

        if (filterData.tri) setUrlTri(filterData.tri)
        if (filterData.ordre) setUrlOrdre(filterData.ordre)
        if (filterData.limit) setUrlLimit(filterData.limit)
    }

    const handleSubmit = (e) => { //e.preventDefault() for onSubmit
        e.preventDefault()   //not necessarily needed? the form will send a GET request which still works
    }

    //update the list of films
    const [ listFilm, setListFilm] = useState([])

    useEffect(()=>{
        async function getListFilm(){
            //console.log('urlTri = ',urlTri, ' urlOrdre = ', urlOrdre, ' urlLimit = ', urlLimit)
            const res = await fetch(urlFilms.concat('?','tri=',urlTri,'&ordre=',urlOrdre,'&limit=',urlLimit))
            const jsonRes = await res.json()
            setListFilm(jsonRes)
        }
        getListFilm()
    },[urlTri, urlOrdre, urlLimit])

    return (
        <main className="wrapper">
            <form className='filter' onChange={(e)=>handleFilter(e)} onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="titre"><input type="radio" id="titre" name="tri" value="titre"/>par titre</label>
                <label htmlFor="realisation"><input type="radio" id="realisation" name="tri" value="realisation"/>par réalisateur </label>
                <label htmlFor="annee"><input type="radio" id="annee" name="tri" value="annee"/>par année</label>
                <label htmlFor="asc"><input type="radio" id="asc" name="ordre" value="asc"/>ordre croissant</label>
                <label htmlFor="desc"><input type="radio" id="desc" name="ordre" value="desc"/>Ordre décroissant</label>
                <label htmlFor="limit"><input type="number" id="limit" name="limit" min="1" defaultValue="19"/>nombre de films</label>
            </form>
            <h2>Liste des films</h2>
            <ul className="content">
                {listFilm.map( film => <li key={film.id}><Card film={film}/></li> )}           
            </ul>
        </main>
    );
}

export default List