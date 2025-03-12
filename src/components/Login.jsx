import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/forms.css"
import "../styles/Login.css"

const Login = () => {

    // States pour les inputs et le message d'erreur
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Pour rédiriger après le login

    // Fonction pour vérifier l'authentification
    const handleSubmit = (event) => {
        event.preventDefault(); // Éviter que la page se recharge

        if (!login || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // DEMANDE À LA DATABASE SI L'USER EXISTE OU PAS. Pour l'instant, simuler l'authentification
        if (login === "sara" && password === "cas") {
            navigate("/"); // On va au Forum publique
        } else {
            setError("Login ou mot de passe incorrect"); 
        }
    };

    const handleReset = () => {
        setLogin("");
        setPassword("");
        setError("");
    };

    return (
        <div className="login-container">
            <h1>Ouvrir une session</h1>
            <div id="connect">
                <Link to="/">Page Principale</Link>
                <Link to="/register">Enregistrement</Link>
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset}>

                <label htmlFor="chp_login">Login</label>
                <input id="chp_login" placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)} />

                <label htmlFor="chp_password">Mot de passe</label>
                <input type="password" id="chp_password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Connexion</button>
                <button type="reset">Annuler</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
