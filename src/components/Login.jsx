import { Link } from "react-router-dom";
import "../styles/forms.css"
import "../styles/Login.css"

const Login = () => {
    return (
        <div className="login-container">
            <h1>Ouvrir une session</h1>
            <div id="connect">
                <Link to="/">Page Principale</Link>
                <Link to="/register">Enregistrement</Link>
            </div>
            <form>
                <label htmlFor="chp_login">Login</label>
                <input id="chp_login" placeholder="Login..." />

                <label htmlFor="chp_password">Mot de passe</label>
                <input type="password" id="chp_password" placeholder="Password..." />

                <button type="submit">Connexion</button>
                <button type="reset">Annuler</button>
            </form>
        </div>
    );
};

export default Login;
