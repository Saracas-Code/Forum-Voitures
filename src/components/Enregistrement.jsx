import { Link } from "react-router-dom";
import "../styles/forms.css"

const Enregistrement = () => {
    return (
        <div>
            <h1>Enregistrement</h1>
            <div id="connect">
                <Link to="/">Page Principale</Link>
                <Link to="/login">Connexion</Link>
            </div>
            <form>
                <div className="prenom_nom">
                    <label htmlFor="chp_prenom">Prénom</label>
                    <input id="chp_prenom" placeholder="Name..." />

                    <label htmlFor="chp_nom">Nom</label>
                    <input id="chp_nom" placeholder="Surname..." />
                </div>

                <label htmlFor="chp_login">Login</label>
                <input id="chp_login" placeholder="Login..." />

                <label htmlFor="chp_password">Mot de passe</label>
                <input type="password" id="chp_password" placeholder="Password..." />

                <label htmlFor="chp_retapez">Retapez</label>
                <input type="password" id="chp_retapez" placeholder="Repeat password..." />

                <button type="submit">S'inscrire</button>
                <button type="reset">Annuler</button>
            </form>
        </div>
    );
};

export default Enregistrement;
