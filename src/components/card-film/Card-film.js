import './Card-film.css'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <Link to={`/film/${props.film.id}`}>
        <div className="pic"><img src={`img/${props.film.titreVignette}`} alt={`image pour ${props.film.titre}`}/></div>
        <div className="txt">
            <h3>{props.film.titre}</h3>
            <p className="description">{props.film.description && props.film.description.replace(/&#x27;/g, "'") }</p>
            <p><span>Année </span> {props.film.annee}</p>
            <p><span>Réalisation </span> {props.film.realisation}</p>
        </div>
    </Link>
  );
}

export default Card