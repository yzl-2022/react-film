import './Footer.css';

function Footer() {
  return (
    <footer className="wrapper">
        <div>
            <dl>
                <dt>À PROPOS DE NOUS</dt>
                <dd><a href="#">Général</a></dd>
                <dd><a href="#">Sur nous</a></dd>
                <dd><a href="#">Annonces</a></dd>
                <dd><a href="#">Visitez-nous</a></dd>
            </dl>
        </div>
        <div>
            <dl>
                <dt>PLAN DU SITE</dt>
                <dd><a href="#">Accueil</a></dd>
                <dd><a href="#">Films</a></dd>
                <dd><a href="#">Films à venir</a></dd>
                <dd><a href="#">Commentaires</a></dd>
            </dl>
        </div>
        <div>
            <dl>
                <dt>PLUS D'INFORMATION</dt>
                <dd><a href="#">Politique de confidentialité</a></dd>
                <dd><a href="#">Données et sécurité</a></dd>
                <dd><a href="#">Publier avec nous</a></dd>
                <dd><a href="#">Rejoignez-nous</a></dd>
            </dl>
        </div>
        <div>
            <dl>
                <dt>CONTACT</dt>
                <dd>Mon Site LTD</dd>
                <dd>3-3333 PIE-IX</dd>
                <dd>Montréal, QC</dd>
                <dd><a href="#">services@api-films.ca</a></dd>
            </dl>
            <ul>
                <li><a href="#"><img src="icons/facebook.svg" alt="facebook"/></a></li>
                <li><a href="#"><img src="icons/twitter.svg" alt="twitter"/></a></li>
                <li><a href="#"><img src="icons/youtube.svg" alt="youtube"/></a></li>
                <li><a href="#"><img src="icons/instagram.svg" alt="instagram"/></a></li>
            </ul>
        </div>
    </footer>  
  );
}

export default Footer