import './Accueil.css'
import message from './Accueil.json'
import { Link } from 'react-router-dom'

function Accueil() {
  return (
    <main className='wrapper'>
      <section className="banner">
        <div className="picture">
            <a href="#"><img src="accueil/accueil.jpg" alt="banner"/></a>
        </div>
        <div className="bannertext">
            <h2>Partagez vos commentaires !</h2>
            <p>Un endroit idéal pour partager vos avis et commentaires sur notre collection de films.</p>
            <Link to="/films">EN SAVOIR PLUS</Link>
        </div>
      </section>
      <section className='msg'>
        {message.map( (p, index)=> <p key={index}>{p}</p>)}
      </section>
    </main>
  );
}

export default Accueil